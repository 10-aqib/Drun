# Drun. — Handcrafted Peshawari Footwear

Next.js storefront with a Supabase back end (and a browser-only demo mode).

```bash
npm install
npm run dev        # http://localhost:3000
```

## Connect Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In **SQL Editor**, run these files from `supabase/migrations/` in order:
   1. `001_initial_schema.sql` — tables and base policies
   2. `002_catalog_expansion.sql` — categories and the 29 catalogue products
   3. `003_secure_commerce.sql` — secure order/tracking functions and admin-only policies
3. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SUPABASE_URL` and
   `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Project Settings → API). On Vercel, add the same two variables
   in Project Settings → Environment Variables and redeploy (they are read at build time).
4. Create your admin account: **Authentication → Users → Add user** (email + password), then give it the
   admin role in the SQL editor:

   ```sql
   update auth.users
      set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'
    where email = 'you@example.com';
   ```
5. Open `/admin` and sign in with that account.

### What goes through Supabase

| Feature | How |
| --- | --- |
| Catalogue | Public read of `products` (archived designs are hidden) |
| Checkout | `place_order()` — prices, names and stock come from the database, stock is decremented atomically |
| Order tracking | `track_order()` — by reference or full phone number; returns no street address or email |
| Contact form / newsletter | Validated inserts; only admins can read them |
| Admin console | Supabase Auth; only users with `app_metadata.role = 'admin'` can read orders/messages or change products |

Customers have no direct access to the `orders` / `order_items` tables. Archiving a product sets
`status = 'archived'` so order history is preserved.

### Demo mode

With the two environment variables unset the store runs entirely in the browser (localStorage): orders,
messages and admin edits stay on that device, and `/admin` uses a local passkey. Use it for design work
only — it is not a real back end.

## Scripts

- `node scripts/generate_sql_seed.js` — regenerate `002_catalog_expansion.sql` from `src/data/products.ts`
- `node scripts/generate_draft_footwear_assets.js` — regenerate the illustrated stand-in product images
