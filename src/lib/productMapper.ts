import { CATEGORIES, Product } from "@/data/products";

/** Row shape of public.products (see supabase/migrations). */
export interface ProductRow {
  id: string;
  sku: string | null;
  name: string;
  slug: string;
  tagline: string | null;
  category_slug: string | null;
  brand: string | null;
  price: number;
  original_price: number | null;
  in_stock: boolean | null;
  stock_count: number | null;
  status: string | null;
  photo_status: string | null;
  image: string;
  additional_images: string[] | null;
  image_alt: string | null;
  image_rights: string | null;
  leather_type: string;
  sole_type: string;
  footwear_style: string | null;
  color: string;
  color_hex: string;
  sizes: number[] | null;
  rating: number | string | null;
  review_count: number | null;
  featured: boolean | null;
  is_new: boolean | null;
  is_signature: boolean | null;
  weight: string | null;
  description: string | null;
  craft_details: string[] | null;
  care_instructions: string[] | null;
  delivery_info: string | null;
  return_policy: string | null;
}

const SLUGS = ["classic", "kaptaan", "norozi", "modern", "heritage", "contemporary"] as const;

export function rowToProduct(r: ProductRow): Product {
  const slug = (SLUGS as readonly string[]).includes(r.category_slug ?? "")
    ? (r.category_slug as Product["categorySlug"])
    : "classic";
  const category = (CATEGORIES.find((c) => c.slug === slug)?.name ?? "Classic Peshawari") as Product["category"];
  const stock = r.stock_count ?? 0;
  return {
    id: r.id,
    sku: r.sku ?? r.id.toUpperCase(),
    name: r.name,
    slug: r.slug,
    tagline: r.tagline ?? "",
    category,
    categorySlug: slug,
    brand: r.brand ?? "Drun.",
    price: r.price,
    originalPrice: r.original_price ?? undefined,
    inStock: (r.in_stock ?? true) && stock > 0,
    stockCount: stock,
    status: r.status === "published" ? "published" : "draft",
    photoStatus: r.photo_status === "verified" ? "verified" : "awaiting_studio_assets",
    image: r.image,
    additionalImages: r.additional_images?.length ? r.additional_images : [r.image],
    imageAlt: r.image_alt ?? r.name,
    imageRights: r.image_rights ?? "Drun. Footwear Authorized Merchandise",
    leatherType: r.leather_type,
    soleType: r.sole_type,
    footwearStyle: r.footwear_style ?? "",
    color: r.color,
    colorHex: r.color_hex,
    sizes: r.sizes?.length ? r.sizes : [39, 40, 41, 42, 43, 44, 45],
    rating: Number(r.rating ?? 5),
    reviewCount: r.review_count ?? 0,
    featured: !!r.featured,
    isNew: !!r.is_new,
    isSignature: !!r.is_signature,
    weight: r.weight ?? "850g per pair",
    description: r.description ?? "",
    craftDetails: r.craft_details ?? [],
    careInstructions: r.care_instructions ?? [],
    deliveryInfo: r.delivery_info ?? "",
    returnPolicy: r.return_policy ?? "",
  };
}

export function productToRow(p: Product): ProductRow {
  return {
    id: p.id,
    sku: p.sku,
    name: p.name,
    slug: p.slug,
    tagline: p.tagline,
    category_slug: p.categorySlug,
    brand: p.brand,
    price: Math.round(p.price),
    original_price: p.originalPrice ? Math.round(p.originalPrice) : null,
    in_stock: p.stockCount > 0,
    stock_count: Math.max(0, Math.round(p.stockCount)),
    status: p.status,
    photo_status: p.photoStatus,
    image: p.image,
    additional_images: p.additionalImages,
    image_alt: p.imageAlt,
    image_rights: p.imageRights,
    leather_type: p.leatherType,
    sole_type: p.soleType,
    footwear_style: p.footwearStyle,
    color: p.color,
    color_hex: p.colorHex,
    sizes: p.sizes,
    rating: p.rating,
    review_count: p.reviewCount,
    featured: p.featured,
    is_new: p.isNew,
    is_signature: p.isSignature,
    weight: p.weight,
    description: p.description,
    craft_details: p.craftDetails,
    care_instructions: p.careInstructions,
    delivery_info: p.deliveryInfo,
    return_policy: p.returnPolicy,
  };
}
