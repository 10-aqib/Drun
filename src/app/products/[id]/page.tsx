import type { Metadata } from "next";
import { PRODUCTS, formatPKR } from "@/data/products";
import ProductDetailPage from "@/components/ProductDetailPage";

type Params = Promise<{ id: string }>;

// Pre-render every catalogue product; products the admin adds later resolve on the client.
export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find((p) => p.slug === id || p.id === id);
  if (!product) return { title: "Footwear | Drun." };
  return {
    title: `${product.name} | Drun.`,
    description: `${product.tagline}. ${formatPKR(product.price)} — handcrafted Peshawari footwear by Drun.`,
    openGraph: {
      title: `${product.name} | Drun.`,
      description: product.tagline,
      images: [product.image],
    },
  };
}

export default function Page({ params }: { params: Params }) {
  return <ProductDetailPage params={params} />;
}
