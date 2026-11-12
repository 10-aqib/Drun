import type { Metadata } from "next";
import { CATEGORIES } from "@/data/products";
import CollectionDetailPage from "@/components/CollectionDetailPage";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return [...CATEGORIES.map((c) => ({ slug: c.slug })), { slug: "all" }];
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug.toLowerCase());
  if (!category) return { title: "Collections | Drun." };
  return { title: `${category.name} | Drun.`, description: category.description };
}

export default function Page({ params }: { params: Params }) {
  return <CollectionDetailPage params={params} />;
}
