import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ProductCard, type Product } from "@/components/ProductCard";
import type { Category } from "@/components/CategoryCard";
import categoriesData from "@/data/categories.json";

const getBaseUrl = async () => {
  const headersList = await headers();
  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  const host = headersList.get("host");
  return process.env.NEXT_PUBLIC_APP_URL ?? `${protocol}://${host}`;
};

const fetchCategory = async (slug: string) => {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/categories`);
  const categories = (await res.json()) as Category[];
  return categories.find((category) => category.id === slug);
};

const fetchProducts = async (slug: string) => {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/products?category=${slug}`);
  if (!res.ok) throw new Error("Ürünler alınamadı");
  return (await res.json()) as Product[];
};

export const generateStaticParams = async () => {
  return categoriesData.map((category) => ({ slug: category.id }));
};

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await fetchCategory(params.slug);
  if (!category) notFound();
  const products = await fetchProducts(params.slug);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10">
      <section className="rounded-3xl bg-slate-900 p-10 text-white">
        <p className="text-lg font-semibold uppercase tracking-[0.3em] text-white/70">
          Kategori
        </p>
        <h1 className="text-4xl font-semibold">{category.name}</h1>
        <p className="mt-4 max-w-2xl text-white/80">{category.description}</p>
      </section>

      <section className="space-y-6">
        <p className="text-lg font-semibold uppercase tracking-[0.3em] text-slate-500">
          Ürünler
        </p>
        {products.length === 0 ? (
          <p className="rounded-3xl bg-white p-10 text-center text-slate-500">
            Bu kategoriye ait ürün bulunamadı.
          </p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

