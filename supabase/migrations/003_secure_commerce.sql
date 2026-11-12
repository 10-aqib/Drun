-- ==============================================================================
-- DRUN. - 003: SECURE COMMERCE LAYER
--   * admin access is limited to users whose app_metadata.role = 'admin'
--   * orders are created ONLY through place_order() (prices come from the DB)
--   * customers look orders up ONLY through track_order() (no table access)
--   * products can be archived (status = 'archived') without breaking order history
-- Run after 001 and 002 in the Supabase SQL editor.
-- ==============================================================================

-- 1. ADMIN CHECK -------------------------------------------------------------
-- Set a user as admin in the Supabase dashboard (Authentication > Users > user >
-- raw app_metadata) or with:
--   update auth.users set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}' where email = 'you@example.com';
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
AS $$
  SELECT COALESCE(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin';
$$;

-- 2. POLICIES -----------------------------------------------------------------
-- Replace the old "any authenticated user is admin" and open-insert policies.
DROP POLICY IF EXISTS "Admin Full Orders" ON orders;
DROP POLICY IF EXISTS "Admin Full Products" ON products;
DROP POLICY IF EXISTS "Public Insert Orders" ON orders;
DROP POLICY IF EXISTS "Public Insert Order Items" ON order_items;
DROP POLICY IF EXISTS "Public Insert Messages" ON contact_messages;
DROP POLICY IF EXISTS "Public Insert Newsletter" ON newsletter_subscriptions;
DROP POLICY IF EXISTS "Public Read Products" ON products;
DROP POLICY IF EXISTS "Admin Write Products" ON products;
DROP POLICY IF EXISTS "Admin Write Categories" ON categories;
DROP POLICY IF EXISTS "Admin Full Order Items" ON order_items;
DROP POLICY IF EXISTS "Admin Full Messages" ON contact_messages;
DROP POLICY IF EXISTS "Admin Full Newsletter" ON newsletter_subscriptions;

-- Catalogue: everyone reads published/draft designs, only admins see archived ones.
CREATE POLICY "Public Read Products" ON products FOR SELECT
  USING (status IS DISTINCT FROM 'archived' OR public.is_admin());
CREATE POLICY "Admin Write Products" ON products FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin Write Categories" ON categories FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Orders / items: admin only. Customers never touch these tables directly.
CREATE POLICY "Admin Full Orders" ON orders FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "Admin Full Order Items" ON order_items FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Contact form: anyone may write a sane message; only admins read/manage them.
CREATE POLICY "Public Insert Messages" ON contact_messages FOR INSERT
  WITH CHECK (
    length(trim(name)) BETWEEN 1 AND 255
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND length(trim(message)) BETWEEN 1 AND 5000
    AND status = 'unread'
  );
CREATE POLICY "Admin Full Messages" ON contact_messages FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- Newsletter: anyone may subscribe a valid email; only admins read the list.
CREATE POLICY "Public Insert Newsletter" ON newsletter_subscriptions FOR INSERT
  WITH CHECK (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' AND active = TRUE);
CREATE POLICY "Admin Full Newsletter" ON newsletter_subscriptions FOR ALL TO authenticated
  USING (public.is_admin()) WITH CHECK (public.is_admin());

-- 3. PLACE ORDER ---------------------------------------------------------------
-- Input:
--   p_customer: {fullName, email, phone, address, city, province, postalCode?, deliveryNotes?, paymentMethod}
--   p_items:    [{productId, size, quantity}]
-- Prices, names and stock are taken from the products table, never from the client.
CREATE OR REPLACE FUNCTION public.place_order(p_customer JSONB, p_items JSONB)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_name      TEXT := trim(COALESCE(p_customer ->> 'fullName', ''));
  v_email     TEXT := trim(COALESCE(p_customer ->> 'email', ''));
  v_phone     TEXT := trim(COALESCE(p_customer ->> 'phone', ''));
  v_address   TEXT := trim(COALESCE(p_customer ->> 'address', ''));
  v_city      TEXT := trim(COALESCE(p_customer ->> 'city', ''));
  v_province  TEXT := trim(COALESCE(p_customer ->> 'province', ''));
  v_payment   TEXT := COALESCE(NULLIF(p_customer ->> 'paymentMethod', ''), 'cod');
  v_digits    TEXT := regexp_replace(COALESCE(p_customer ->> 'phone', ''), '\D', '', 'g');
  v_order_id  TEXT;
  v_item      JSONB;
  v_product   products%ROWTYPE;
  v_qty       INTEGER;
  v_size      INTEGER;
  v_subtotal  INTEGER := 0;
  v_lines     JSONB := '[]'::jsonb;
  v_updated   INTEGER;
BEGIN
  IF v_name = '' OR v_address = '' OR v_city = '' OR v_province = '' THEN
    RAISE EXCEPTION 'Missing delivery details' USING ERRCODE = '22023';
  END IF;
  IF v_email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' THEN
    RAISE EXCEPTION 'Invalid email address' USING ERRCODE = '22023';
  END IF;
  IF length(v_digits) < 10 OR length(v_digits) > 13 THEN
    RAISE EXCEPTION 'Invalid phone number' USING ERRCODE = '22023';
  END IF;
  IF v_payment NOT IN ('cod', 'bank', 'card') THEN
    RAISE EXCEPTION 'Invalid payment method' USING ERRCODE = '22023';
  END IF;
  IF jsonb_typeof(p_items) <> 'array' OR jsonb_array_length(p_items) NOT BETWEEN 1 AND 50 THEN
    RAISE EXCEPTION 'Order must contain between 1 and 50 lines' USING ERRCODE = '22023';
  END IF;

  -- Unique, human-friendly reference
  LOOP
    v_order_id := 'DRN-' || (100000 + floor(random() * 900000))::INT;
    EXIT WHEN NOT EXISTS (SELECT 1 FROM orders WHERE id = v_order_id);
  END LOOP;

  INSERT INTO orders (
    id, customer_name, customer_email, customer_phone, shipping_address, shipping_city,
    shipping_province, postal_code, delivery_notes, payment_method, payment_status,
    status, subtotal, total
  ) VALUES (
    v_order_id, v_name, v_email, v_phone, v_address, v_city, v_province,
    NULLIF(trim(COALESCE(p_customer ->> 'postalCode', '')), ''),
    NULLIF(trim(COALESCE(p_customer ->> 'deliveryNotes', '')), ''),
    v_payment,
    CASE WHEN v_payment = 'cod' THEN 'Pending (Cash on Delivery)' ELSE 'Pending Verification' END,
    'Processing', 0, 0
  );

  FOR v_item IN SELECT * FROM jsonb_array_elements(p_items) LOOP
    v_qty  := COALESCE((v_item ->> 'quantity')::INTEGER, 0);
    v_size := COALESCE((v_item ->> 'size')::INTEGER, 0);
    IF v_qty < 1 OR v_qty > 20 THEN
      RAISE EXCEPTION 'Invalid quantity' USING ERRCODE = '22023';
    END IF;

    SELECT * INTO v_product FROM products
     WHERE id = v_item ->> 'productId' AND status IS DISTINCT FROM 'archived';
    IF NOT FOUND THEN
      RAISE EXCEPTION 'Product % is no longer available', v_item ->> 'productId' USING ERRCODE = 'P0002';
    END IF;
    IF NOT (v_size = ANY (v_product.sizes)) THEN
      RAISE EXCEPTION 'Size % is not available for %', v_size, v_product.name USING ERRCODE = '22023';
    END IF;

    -- Atomic stock decrement (fails cleanly if someone else bought the last pair)
    UPDATE products
       SET stock_count = stock_count - v_qty,
           in_stock = (stock_count - v_qty) > 0,
           updated_at = NOW()
     WHERE id = v_product.id AND stock_count >= v_qty;
    GET DIAGNOSTICS v_updated = ROW_COUNT;
    IF v_updated = 0 THEN
      RAISE EXCEPTION 'Only % pair(s) of % remain in stock', v_product.stock_count, v_product.name USING ERRCODE = 'P0001';
    END IF;

    INSERT INTO order_items (order_id, product_id, product_name, size, quantity, unit_price, total_price)
    VALUES (v_order_id, v_product.id, v_product.name, v_size, v_qty, v_product.price, v_product.price * v_qty);

    v_subtotal := v_subtotal + v_product.price * v_qty;
    v_lines := v_lines || jsonb_build_object(
      'productId', v_product.id, 'name', v_product.name, 'size', v_size,
      'quantity', v_qty, 'unitPrice', v_product.price
    );
  END LOOP;

  UPDATE orders SET subtotal = v_subtotal, total = v_subtotal WHERE id = v_order_id;

  RETURN jsonb_build_object('id', v_order_id, 'subtotal', v_subtotal, 'total', v_subtotal, 'items', v_lines);
END;
$$;

-- 4. TRACK ORDER ---------------------------------------------------------------
-- Look up by order reference, or by the full phone number used at checkout.
-- Returns only what a customer needs (no street address, no email).
CREATE OR REPLACE FUNCTION public.track_order(p_query TEXT)
RETURNS JSONB
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_q      TEXT := upper(trim(COALESCE(p_query, '')));
  v_digits TEXT := regexp_replace(COALESCE(p_query, ''), '\D', '', 'g');
  v_order  orders%ROWTYPE;
BEGIN
  IF v_q = '' THEN RETURN NULL; END IF;

  SELECT * INTO v_order FROM orders WHERE upper(id) = v_q;
  IF NOT FOUND AND length(v_digits) >= 10 THEN
    SELECT * INTO v_order FROM orders
     WHERE length(regexp_replace(customer_phone, '\D', '', 'g')) >= 10
       AND (right(regexp_replace(customer_phone, '\D', '', 'g'), 10) = right(v_digits, 10))
     ORDER BY created_at DESC LIMIT 1;
  END IF;
  IF NOT FOUND THEN RETURN NULL; END IF;

  RETURN jsonb_build_object(
    'id', v_order.id,
    'status', v_order.status,
    'createdAt', v_order.created_at,
    'total', v_order.total,
    'paymentMethod', v_order.payment_method,
    'customer', jsonb_build_object(
      'fullName', v_order.customer_name,
      'phone', '••••' || right(regexp_replace(v_order.customer_phone, '\D', '', 'g'), 4),
      'city', v_order.shipping_city,
      'province', v_order.shipping_province
    ),
    'items', COALESCE((
      SELECT jsonb_agg(jsonb_build_object(
        'product', jsonb_build_object('name', product_name, 'price', unit_price),
        'size', size, 'quantity', quantity))
      FROM order_items WHERE order_id = v_order.id
    ), '[]'::jsonb)
  );
END;
$$;

REVOKE ALL ON FUNCTION public.place_order(JSONB, JSONB) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.track_order(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.place_order(JSONB, JSONB) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.track_order(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.is_admin() TO anon, authenticated;
