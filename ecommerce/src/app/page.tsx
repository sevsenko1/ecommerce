import { headers } from "next/headers";
import { CategoryCard, type Category } from "@/components/CategoryCard";
import { type Product } from "@/components/ProductCard";
import { WhyPlakLab } from "@/components/WhyPlakLab";
import { FeatureCarousel } from "@/components/FeatureCarousel";
import { ProductsPage } from "@/components/ProductsPage";

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
    <div className="mx-auto flex max-w-7xl flex-col gap-16 px-4 py-10">
      <section id="hero" className="grid gap-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-10 text-white lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-6">
          <p className="text-lg font-semibold uppercase tracking-[0.3em] text-white/70">
            Analog koleksiyon
          </p>
          <h1 className="text-4xl font-semibold leading-tight">
            PlakLab: Analog sesin modern adresi
          </h1>
          <p className="text-lg text-white/80">
            Koleksiyon değeri taşıyan plaklar ve kasetler için özenle seçilmiş küratörlü koleksiyon. 
            Her ürün AAA mastering sertifikası, özel paketleme ve detaylı bilgilendirme ile geliyor.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#products"
              className="group relative overflow-hidden rounded-full border-2 border-transparent bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-rose-500 hover:shadow-lg hover:shadow-rose-500/20"
            >
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-rose-500 via-orange-400 to-rose-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
                Yeni gelenleri keşfet
              </span>
            </a>
            <a
              href="#categories"
              className="group relative overflow-hidden rounded-full border-2 border-white/30 bg-transparent px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/10 hover:shadow-lg hover:shadow-white/20"
            >
              <span className="absolute inset-0 rounded-full border-2 border-transparent bg-gradient-to-r from-white/20 via-white/40 to-white/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
              <span className="relative z-10">Rafları incele</span>
            </a>
          </div>
        </div>
        <div id="why-plaklab">
          <WhyPlakLab />
        </div>
      </section>

      <section id="features" className="space-y-6">
        <FeatureCarousel />
      </section>

      <section id="categories" className="space-y-6">
        <p className="text-center text-lg font-semibold uppercase tracking-[0.3em] text-slate-500">
          Koleksiyon Kategorileri
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <ProductsPage products={products} categories={categories} />
    </div>
  );
}
