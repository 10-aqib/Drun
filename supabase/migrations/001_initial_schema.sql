-- ==============================================================================
-- DRUN. LUXURY PESHAWARI FOOTWEAR - SUPABASE POSTGRESQL SCHEMA MIGRATION
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(128) NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    tagline TEXT,
    category_slug VARCHAR(64) REFERENCES categories(slug) ON DELETE SET NULL,
    price INTEGER NOT NULL,
    original_price INTEGER,
    in_stock BOOLEAN DEFAULT TRUE,
    stock_count INTEGER DEFAULT 10,
    image TEXT NOT NULL,
    additional_images TEXT[] DEFAULT '{}',
    leather_type VARCHAR(255) NOT NULL,
    sole_type VARCHAR(255) NOT NULL,
    color VARCHAR(128) NOT NULL,
    color_hex VARCHAR(16) NOT NULL,
    sizes INTEGER[] DEFAULT '{39,40,41,42,43,44,45}',
    rating NUMERIC(3, 2) DEFAULT 5.0,
    review_count INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT FALSE,
    is_new BOOLEAN DEFAULT FALSE,
    is_signature BOOLEAN DEFAULT FALSE,
    description TEXT,
    craft_details TEXT[] DEFAULT '{}',
    care_instructions TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(64) PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(64) NOT NULL,
    shipping_address TEXT NOT NULL,
    shipping_city VARCHAR(128) NOT NULL,
    shipping_province VARCHAR(128) NOT NULL,
    postal_code VARCHAR(32),
    delivery_notes TEXT,
    payment_method VARCHAR(32) DEFAULT 'cod',
    payment_status VARCHAR(64) DEFAULT 'Pending (COD)',
    status VARCHAR(64) DEFAULT 'Processing',
    subtotal INTEGER NOT NULL,
    total INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. ORDER ITEMS TABLE
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id VARCHAR(64) REFERENCES orders(id) ON DELETE CASCADE,
    product_id VARCHAR(64) REFERENCES products(id),
    product_name VARCHAR(255) NOT NULL,
    size INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    unit_price INTEGER NOT NULL,
    total_price INTEGER NOT NULL
);

-- 6. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(64),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(32) DEFAULT 'unread',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. NEWSLETTER SUBSCRIPTIONS TABLE
CREATE TABLE IF NOT EXISTS newsletter_subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    active BOOLEAN DEFAULT TRUE,
    subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. INDEXES FOR HIGH-EFFICIENCY LOOKUPS
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_slug);
CREATE INDEX IF NOT EXISTS idx_products_price ON products(price);
CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- 9. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscriptions ENABLE ROW LEVEL SECURITY;

-- Public can view catalog
CREATE POLICY "Public Read Categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON products FOR SELECT USING (true);

-- Public can insert orders, messages, and newsletter
CREATE POLICY "Public Insert Orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Order Items" ON order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Newsletter" ON newsletter_subscriptions FOR INSERT WITH CHECK (true);

-- Authenticated Admin Full Access
CREATE POLICY "Admin Full Orders" ON orders FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin Full Products" ON products FOR ALL TO authenticated USING (true);

-- 10. SEED INITIAL CATEGORIES
INSERT INTO categories (slug, name, description) VALUES
('heritage', 'Heritage Collection', 'Traditional character, refined for the present with heavy welt stitches and indestructible tyre soles.')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (slug, name, description) VALUES
('contemporary', 'Contemporary Collection', 'Understated designs, suede textures, and muted tones crafted for modern metropolitan living.')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (slug, name, description) VALUES
('kaptaan', 'Kaptaan Style', 'Imposing architectural square-toe silhouette with hand-ground soles and sculpted leather wings.')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (slug, name, description) VALUES
('classic', 'Classic Charsadda', 'Slim, agile, and featherweight profiles created for daily comfort and timeless grace.')
ON CONFLICT (slug) DO NOTHING;
