import { headers } from "next/headers";
import { notFound } from "next/navigation";
import Image from "next/image";
import productsData from "@/data/products.json";
import categoriesData from "@/data/categories.json";
import { formatPrice } from "@/utils/formatPrice";
import { ProductCard, type Product } from "@/components/ProductCard";
import { AddToCartButton } from "@/components/AddToCartButton";

const getBaseUrl = async () => {
  const headersList = await headers();
  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  const host = headersList.get("host");
  return process.env.NEXT_PUBLIC_APP_URL ?? `${protocol}://${host}`;
};

const fetchProduct = async (id: string) => {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/products`);
  if (!res.ok) throw new Error("Ürün alınamadı");
  const products = (await res.json()) as Product[];
  return products.find((product) => product.id === id);
};

const fetchRelated = async (category: string, id: string) => {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/products?category=${category}`);
  if (!res.ok) return [];
  const products = (await res.json()) as Product[];
  return products.filter((product) => product.id !== id).slice(0, 3);
};

export const generateStaticParams = async () => {
  return productsData.map((product) => ({ id: product.id }));
};

const categoryMap = Object.fromEntries(
  categoriesData.map((category) => [category.id, category.name]),
);

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await fetchProduct(id);
  if (!product) notFound();
  const related = await fetchRelated(product.category, product.id);

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-10">
      <div className="grid gap-8 rounded-3xl bg-white p-8 shadow-sm lg:grid-cols-2">
        <div className="relative h-96 w-full overflow-hidden rounded-3xl bg-slate-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-slate-500">
              {categoryMap[product.category] ?? product.category}
            </p>
            <h1 className="text-4xl font-semibold">{product.name}</h1>
          </div>
          <p className="text-lg text-slate-600">{product.description}</p>
          <div>
            <p className="text-3xl font-bold">{formatPrice(product.price)}</p>
            <p className="text-sm text-amber-500">
              ★ {product.rating.toFixed(1)} kullanıcı puanı
            </p>
          </div>
          <ul className="space-y-2 rounded-2xl border border-slate-100 p-4 text-sm text-slate-600">
            {product.highlights?.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
          <AddToCartButton product={product} />
        </div>
      </div>

      {related.length > 0 && (
        <section className="space-y-6">
          <p className="text-lg font-semibold uppercase tracking-[0.3em] text-slate-500">
            Benzer ürünler
          </p>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

