const fs = require('fs');
const path = require('path');

// Read products.ts
const productsFilePath = path.join(__dirname, '../src/data/products.ts');
const fileContent = fs.readFileSync(productsFilePath, 'utf8');

// Extract the PRODUCTS array using a simple regex / eval
const arrayMatch = fileContent.match(/export const PRODUCTS: Product\[\] = (\[[\s\S]*?\]);\s*export const CATEGORIES/);
if (!arrayMatch) {
  console.error("Could not match PRODUCTS array");
  process.exit(1);
}

// Clean TypeScript types if any and parse
let arrayCode = arrayMatch[1];
// Evaluate safely
const products = eval(arrayCode);
console.log(`Evaluated ${products.length} products successfully.`);

let sql = `-- ==============================================================================
-- DRUN. LUXURY PESHAWARI FOOTWEAR - 24-PRODUCT CATALOG EXPANSION MIGRATION
-- ==============================================================================

-- 1. ADD NEW COLUMNS TO PRODUCTS IF NOT PRESENT
ALTER TABLE products 
ADD COLUMN IF NOT EXISTS sku VARCHAR(64) UNIQUE,
ADD COLUMN IF NOT EXISTS status VARCHAR(32) DEFAULT 'published',
ADD COLUMN IF NOT EXISTS photo_status VARCHAR(64) DEFAULT 'verified',
ADD COLUMN IF NOT EXISTS brand VARCHAR(64) DEFAULT 'Drun.',
ADD COLUMN IF NOT EXISTS weight VARCHAR(64) DEFAULT '850g',
ADD COLUMN IF NOT EXISTS footwear_style VARCHAR(128),
ADD COLUMN IF NOT EXISTS delivery_info TEXT DEFAULT 'Complimentary tracked courier delivery across Pakistan (2–4 business days).',
ADD COLUMN IF NOT EXISTS return_policy TEXT DEFAULT '14-day complimentary size exchange in original packaging.',
ADD COLUMN IF NOT EXISTS image_alt TEXT,
ADD COLUMN IF NOT EXISTS image_rights TEXT DEFAULT 'Drun. Footwear Authorized Merchandise';

-- 2. EXPAND / UPSERT BALANCED CATEGORIES
INSERT INTO categories (slug, name, description) VALUES
('classic', 'Classic Peshawari', 'Traditional Peshawari chappals refined with time-honoured single cross-straps and hand-welted tyre soles.')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

INSERT INTO categories (slug, name, description) VALUES
('kaptaan', 'Kaptaan Style', 'Imposing architectural square-toe silhouette with hand-ground soles, deep instep wings, and antique brass insignia.')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

INSERT INTO categories (slug, name, description) VALUES
('norozi', 'Norozi Style', 'The crown jewel of Pashtun shoemaking featuring sweeping instep straps, thick cord double-welt stitching, and indestructible tyre soles.')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

INSERT INTO categories (slug, name, description) VALUES
('modern', 'Modern & Signature', 'Contemporary Peshawari-inspired footwear with refined minimalist profiles, velvety nubuck textures, and dual-tone finishes.')
ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name, description = EXCLUDED.description;

INSERT INTO categories (slug, name, description) VALUES
('heritage', 'Heritage Collection', 'Traditional character, refined for the present with heavy welt stitches and indestructible tyre soles.')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO categories (slug, name, description) VALUES
('contemporary', 'Contemporary Collection', 'Understated designs, suede textures, and muted tones crafted for modern metropolitan living.')
ON CONFLICT (slug) DO NOTHING;

-- 3. UPSERT ALL 29 CATALOG PRODUCTS
`;

function escapeSql(str) {
  if (str === null || str === undefined) return "NULL";
  return "'" + str.replace(/'/g, "''") + "'";
}

function escapeSqlArray(arr) {
  if (!arr || !Array.isArray(arr)) return "'{}'";
  const escapedItems = arr.map(item => `"${String(item).replace(/"/g, '\\"')}"`).join(",");
  return `'{${escapedItems}}'`;
}

function escapeIntArray(arr) {
  if (!arr || !Array.isArray(arr)) return "'{}'";
  return `'{${arr.join(",")}}'`;
}

products.forEach(p => {
  sql += `
INSERT INTO products (
    id, sku, name, slug, tagline, category_slug, brand, price, original_price,
    in_stock, stock_count, status, photo_status, image, additional_images,
    image_alt, image_rights, leather_type, sole_type, footwear_style,
    color, color_hex, sizes, rating, review_count, featured, is_new, is_signature,
    weight, description, craft_details, care_instructions, delivery_info, return_policy
) VALUES (
    ${escapeSql(p.id)},
    ${escapeSql(p.sku)},
    ${escapeSql(p.name)},
    ${escapeSql(p.slug)},
    ${escapeSql(p.tagline)},
    ${escapeSql(p.categorySlug)},
    ${escapeSql(p.brand || 'Drun.')},
    ${p.price},
    ${p.originalPrice || 'NULL'},
    ${p.inStock ? 'TRUE' : 'FALSE'},
    ${p.stockCount || 10},
    ${escapeSql(p.status || 'draft')},
    ${escapeSql(p.photoStatus || 'verified')},
    ${escapeSql(p.image)},
    ${escapeSqlArray(p.additionalImages)},
    ${escapeSql(p.imageAlt)},
    ${escapeSql(p.imageRights)},
    ${escapeSql(p.leatherType)},
    ${escapeSql(p.soleType)},
    ${escapeSql(p.footwearStyle)},
    ${escapeSql(p.color)},
    ${escapeSql(p.colorHex)},
    ${escapeIntArray(p.sizes)},
    ${p.rating || 5.0},
    ${p.reviewCount || 0},
    ${p.featured ? 'TRUE' : 'FALSE'},
    ${p.isNew ? 'TRUE' : 'FALSE'},
    ${p.isSignature ? 'TRUE' : 'FALSE'},
    ${escapeSql(p.weight)},
    ${escapeSql(p.description)},
    ${escapeSqlArray(p.craftDetails)},
    ${escapeSqlArray(p.careInstructions)},
    ${escapeSql(p.deliveryInfo)},
    ${escapeSql(p.returnPolicy)}
) ON CONFLICT (id) DO UPDATE SET
    sku = EXCLUDED.sku,
    name = EXCLUDED.name,
    slug = EXCLUDED.slug,
    tagline = EXCLUDED.tagline,
    category_slug = EXCLUDED.category_slug,
    brand = EXCLUDED.brand,
    price = EXCLUDED.price,
    original_price = EXCLUDED.original_price,
    in_stock = EXCLUDED.in_stock,
    stock_count = EXCLUDED.stock_count,
    status = EXCLUDED.status,
    photo_status = EXCLUDED.photo_status,
    image = EXCLUDED.image,
    additional_images = EXCLUDED.additional_images,
    image_alt = EXCLUDED.image_alt,
    image_rights = EXCLUDED.image_rights,
    leather_type = EXCLUDED.leather_type,
    sole_type = EXCLUDED.sole_type,
    footwear_style = EXCLUDED.footwear_style,
    color = EXCLUDED.color,
    color_hex = EXCLUDED.color_hex,
    sizes = EXCLUDED.sizes,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    featured = EXCLUDED.featured,
    is_new = EXCLUDED.is_new,
    is_signature = EXCLUDED.is_signature,
    weight = EXCLUDED.weight,
    description = EXCLUDED.description,
    craft_details = EXCLUDED.craft_details,
    care_instructions = EXCLUDED.care_instructions,
    delivery_info = EXCLUDED.delivery_info,
    return_policy = EXCLUDED.return_policy,
    updated_at = CURRENT_TIMESTAMP;
`;
});

sql += `
-- 4. INDEXES
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_products_sku ON products(sku);
`;

const migrationPath = path.join(__dirname, '../supabase/migrations/002_catalog_expansion.sql');
fs.writeFileSync(migrationPath, sql, 'utf8');
console.log(`Successfully generated migration file: ${migrationPath}`);
