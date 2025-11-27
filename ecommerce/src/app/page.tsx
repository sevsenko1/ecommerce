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

const featureHighlights = [
  {
    title: "AAA Mastering Sözü",
    description:
      "Analog banttan kesilen baskıları işaretliyor, dijital kaynaklılar için ayrı etiket sunuyoruz.",
  },
  {
    title: "Anti-statik Paketleme",
    description:
      "Her sipariş kristal iç kılıf, dış koruma ve nem bariyeri ile geliyor.",
  },
  {
    title: "Koleksiyon Takibi",
    description:
      "Sınırlı stoklu baskılar için tekrar basım bildirimleri ve bekleme listesi yönetimi.",
  },
];

export default async function HomePage() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-10">
      <section className="grid gap-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-10 text-white lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <p className="text-lg font-semibold uppercase tracking-[0.3em] text-white/70">
            Analog seçki
          </p>
          <h1 className="text-4xl font-semibold leading-tight">
            GrooveVault: retro plak ve kaset koleksiyoncuları için küratörlü vitrin
          </h1>
          <p className="text-lg text-white/80">
            Trendyol benzeri kart tabanlı deneyimi; AAA mastering verileri, anti-statik paketleme
            ve limitli stok uyarılarıyla yeniden tasarladık.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#products"
              className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900"
            >
              Yeni gelenleri keşfet
            </a>
            <a
              href="#categories"
              className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white"
            >
              Rafları incele
            </a>
          </div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur">
          <p className="mb-4 text-lg font-semibold uppercase tracking-[0.3em] text-white/70">
            Analog Manifesto
          </p>
          <ul className="space-y-4 text-sm text-white/80">
            <li>• Her plak anti-statik iç kılıf ve korumalı dış kılıfla gönderilir.</li>
            <li>• AAA mastering / dijital remaster ayrımı ürün kartlarında açıkça belirtilir.</li>
            <li>• Limitli baskılar için stok bittiğinde otomatik bekleme listesi önerisi gelir.</li>
            <li>• CartContext ile plak/format bazlı varyasyonları takip ediyoruz.</li>
          </ul>
        </div>
      </section>

      <section className="grid gap-6 rounded-3xl bg-white p-8 shadow-sm lg:grid-cols-3">
        {featureHighlights.map((feature) => (
          <div key={feature.title} className="space-y-3">
            <span className="text-xs uppercase tracking-[0.4em] text-slate-400">
              {feature.title}
            </span>
            <p className="text-base text-slate-600">{feature.description}</p>
          </div>
        ))}
      </section>

      <section id="categories" className="space-y-6">
        <p className="text-lg font-semibold uppercase tracking-[0.3em] text-slate-500">
          Raflar
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      <section id="products" className="space-y-6">
        <p className="text-lg font-semibold uppercase tracking-[0.3em] text-slate-500">
          Yeni gelen plaklar
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
