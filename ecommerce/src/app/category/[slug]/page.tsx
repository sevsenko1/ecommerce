import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ProductCard, type Product } from "@/components/ProductCard";
import categoriesData from "@/data/categories.json";

const getBaseUrl = async () => {
  const headersList = await headers();
  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  const host = headersList.get("host");
  return process.env.NEXT_PUBLIC_APP_URL ?? `${protocol}://${host}`;
};

const findCategory = (slug: string) =>
  categoriesData.find((category) => category.id === slug);

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
  const category = findCategory(params.slug);
  if (!category) notFound();
  const products = await fetchProducts(params.slug);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-10">
      <section className="relative overflow-hidden rounded-3xl text-white">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/70 to-transparent" />
        <div className="relative z-10 flex flex-col gap-4 p-10">
          <p className="text-sm uppercase tracking-[0.4em] text-white/70">
            Analog raf
          </p>
          <h1 className="text-4xl font-semibold">{category.name}</h1>
          <p className="max-w-2xl text-white/85">{category.description}</p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/80">
            <span className="rounded-full border border-white/40 px-4 py-1">
              {products.length} plak listelendi
            </span>
            <span className="rounded-full border border-white/40 px-4 py-1">
              Anti-statik kılıf hediyesi
            </span>
          </div>
        </div>
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

