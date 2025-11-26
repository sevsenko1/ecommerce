import { headers } from "next/headers";
import { CategoryCard, type Category } from "@/components/CategoryCard";
import { ProductCard, type Product } from "@/components/ProductCard";

const getBaseUrl = async () => {
  const headersList = await headers();
  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  const host = headersList.get("host");
  return process.env.NEXT_PUBLIC_APP_URL ?? `${protocol}://${host}`;
};

const getCategories = async () => {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/categories`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Kategoriler alınamadı");
  return (await res.json()) as Category[];
};

const getProducts = async () => {
  const baseUrl = await getBaseUrl();
  const res = await fetch(`${baseUrl}/api/products`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Ürünler alınamadı");
  return (await res.json()) as Product[];
};

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-10">
      <section className="grid gap-8 rounded-3xl bg-gradient-to-r from-orange-50 via-white to-slate-50 p-10 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <p className="text-lg font-semibold uppercase tracking-[0.3em] text-slate-500">
            Seçili koleksiyonlar
          </p>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900">
            Trendyol & Pazarama tarzında modern, sade ve kart tabanlı deneyim.
          </h1>
          <p className="text-lg text-slate-600">
            App Router + TailwindCSS + mini backend yapısıyla oluşturulmuş
            portföy seviyesinde e-ticaret vitrini.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#products"
              className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white"
            >
              Koleksiyonu keşfet
            </a>
            <a
              href="#categories"
              className="rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-900"
            >
              Kategoriler
            </a>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/70 p-6 shadow-lg shadow-black/5 backdrop-blur">
          <p className="mb-4 text-lg font-semibold uppercase tracking-[0.3em] text-slate-500">
            Sepet Öne Çıkanlar
          </p>
          <ul className="space-y-4 text-sm text-slate-600">
            <li>• Context tabanlı sepet yönetimi</li>
            <li>• API Routes + JSON veri modeli</li>
            <li>• Tailwind ile Trendyol tarzı arayüz</li>
            <li>• Dinamik kategori ve ürün detay rotaları</li>
          </ul>
        </div>
      </section>

      <section id="categories" className="space-y-6">
        <p className="text-lg font-semibold uppercase tracking-[0.3em] text-slate-500">
          Kategoriler
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section id="products" className="space-y-6">
        <p className="text-lg font-semibold uppercase tracking-[0.3em] text-slate-500">
          Yeni sezon ürünler
        </p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
