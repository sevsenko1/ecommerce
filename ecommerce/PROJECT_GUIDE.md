# PlakLab E-Commerce Projesi - Stajyer Rehberi

## 📚 Proje Hakkında

Bu proje, **Next.js 16 App Router** kullanılarak geliştirilmiş bir e-ticaret uygulamasıdır. Plak ve kaset satışı yapan "PlakLab" adlı bir mağaza için yapılmıştır.

---

## 🎯 Projeyi Anlamak İçin Önce Öğrenmen Gerekenler

### 1. Next.js App Router Nedir?

Next.js 13+ ile gelen yeni routing sistemi. Önceki `pages/` klasörü yerine `app/` klasörü kullanılır.

**Temel Farklar:**
- `pages/Home.jsx` ❌ → `app/page.tsx` ✅ (Ana sayfa)
- `pages/Category.jsx` ❌ → `app/category/[slug]/page.tsx` ✅ (Dinamik route)
- Her sayfa bir `page.tsx` dosyası olmalı
- `layout.tsx` ile sayfa düzenleri yönetilir

### 2. Dosya Yapısı

```
src/
├── app/                    # Next.js App Router - Sayfalar
│   ├── page.tsx           # Ana sayfa (/)
│   ├── layout.tsx         # Tüm sayfalar için ortak layout
│   ├── cart/
│   │   └── page.tsx       # Sepet sayfası (/cart)
│   ├── checkout/
│   │   └── page.tsx       # Ödeme sayfası (/checkout)
│   ├── category/
│   │   └── [slug]/
│   │       └── page.tsx   # Kategori sayfası (/category/rock)
│   ├── product/
│   │   └── [id]/
│   │       └── page.tsx   # Ürün detay (/product/vinyl-123)
│   └── api/               # API Routes
│       ├── products/
│       │   └── route.ts   # /api/products endpoint
│       └── categories/
│           └── route.ts   # /api/categories endpoint
│
├── components/            # React Bileşenleri
│   ├── ProductCard/       # Ürün kartı
│   ├── CategoryCard/      # Kategori kartı
│   ├── Navbar/            # Üst menü
│   ├── CartItem/          # Sepet öğesi
│   └── ...
│
├── context/               # React Context (Global State)
│   ├── CartContext.tsx    # Sepet state yönetimi
│   ├── ToastContext.tsx   # Bildirim sistemi
│   └── WishlistContext.tsx # İstek listesi
│
├── hooks/                 # Custom React Hooks
│   └── useFetch.ts        # API çağrıları için hook
│
├── data/                  # Statik veriler (JSON)
│   ├── products.json      # Ürün listesi
│   └── categories.json    # Kategori listesi
│
└── utils/                 # Yardımcı fonksiyonlar
    └── formatPrice.ts     # Fiyat formatlama
```

---

## 🚀 Projeyi Ayağa Kaldırma

### Adım 1: Bağımlılıkları Yükle

```bash
cd ecommerce
npm install
```

### Adım 2: Geliştirme Sunucusunu Başlat

```bash
npm run dev
```

Tarayıcıda `http://localhost:3000` adresine git.

### Adım 3: Build ve Production

```bash
npm run build    # Production build
npm start        # Production sunucusu
```

---

## 🔑 Önemli Kavramlar

### 1. Server Components vs Client Components

**Server Component (Varsayılan):**
```tsx
// app/page.tsx - Server Component
export default async function HomePage() {
  const products = await fetch('/api/products');
  return <div>{/* ... */}</div>;
}
```
- Sunucuda çalışır
- `async/await` kullanabilir
- `useState`, `useEffect` kullanamaz
- Daha hızlı (JavaScript client'a gönderilmez)

**Client Component:**
```tsx
// components/AddToCartButton/index.tsx
"use client";  // ← Bu satır önemli!

export const AddToCartButton = () => {
  const [count, setCount] = useState(0);  // ✅ Kullanılabilir
  return <button onClick={...}>Ekle</button>;
}
```
- Tarayıcıda çalışır
- `"use client"` direktifi gerekli
- `useState`, `useEffect`, event handler'lar kullanılabilir

### 2. Dinamik Routes

**`[slug]` ve `[id]` Nedir?**

Köşeli parantezler dinamik route segmentleridir:

```
app/category/[slug]/page.tsx
→ /category/rock → params.slug = "rock"
→ /category/jazz → params.slug = "jazz"

app/product/[id]/page.tsx
→ /product/vinyl-123 → params.id = "vinyl-123"
```

**Kullanım:**
```tsx
export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;  // URL'den slug değerini al
  const category = await fetchCategory(slug);
  return <div>{category.name}</div>;
}
```

### 3. API Routes

Next.js'te API endpoint'leri `app/api/` klasöründe oluşturulur:

```tsx
// app/api/products/route.ts
export const GET = async (request: Request) => {
  const products = await getProducts();
  return NextResponse.json(products);
};
```

**Kullanım:**
```tsx
// Server Component'te
const products = await fetch('/api/products');
```

### 4. Context API (Global State)

**CartContext:** Sepet işlemleri için
```tsx
const { items, addToCart, removeFromCart } = useCart();
```

**ToastContext:** Bildirimler için
```tsx
const { showToast } = useToast();
showToast("Ürün sepete eklendi");
```

---

## 📖 Proje Akışı

### 1. Ana Sayfa (`app/page.tsx`)

1. Server Component olarak çalışır
2. `getCategories()` ve `getProducts()` fonksiyonları API'den veri çeker
3. `Promise.all()` ile paralel veri çekme
4. Verileri bileşenlere prop olarak geçirir

**Önemli:** `next: { revalidate: 60 }` → 60 saniye cache

### 2. Ürün Listesi

- `ProductsPage` bileşeni ürünleri gösterir
- `ProductCard` her ürün için kart oluşturur
- Filtreleme ve arama özellikleri var

### 3. Sepet İşlemleri

1. Kullanıcı "Sepete Ekle" butonuna tıklar
2. `AddToCartButton` → `CartContext.addToCart()` çağırır
3. Sepet state güncellenir (localStorage'da saklanır)
4. Toast bildirimi gösterilir

### 4. Checkout Akışı

1. **Adres Ekranı:** Form doldurulur, validasyon yapılır
2. **Ödeme Ekranı:** Adres özeti gösterilir, ödeme simüle edilir
3. **Tamamlama:** Sepet temizlenir, success toast gösterilir

---

## 🛠️ Teknolojiler

- **Next.js 16.0.7** - React framework (App Router)
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Context** - State management

---

## 🎓 Öğrenmen Gerekenler (Sırayla)

### 1. Temel Next.js
- [ ] App Router yapısı
- [ ] Server vs Client Components
- [ ] Dinamik routes (`[id]`, `[slug]`)
- [ ] API Routes

### 2. React
- [ ] Hooks (`useState`, `useEffect`, `useContext`)
- [ ] Props ve State
- [ ] Event handling

### 3. TypeScript
- [ ] Type tanımlamaları
- [ ] Interface ve Type
- [ ] Type inference

### 4. Bu Projede
- [ ] Context API kullanımı
- [ ] Form validasyonu
- [ ] API çağrıları
- [ ] Image optimization (Next.js Image)

---

## 🐛 Yaygın Hatalar ve Çözümleri

### 1. "use client" Eksik
```tsx
// Hata: useState kullanıyorsun ama "use client" yok
const [count, setCount] = useState(0);

// Çözüm:
"use client";  // Dosyanın en üstüne ekle
```

### 2. Async Component Hatası
```tsx
// Hata: Client Component'te async kullanamazsın
"use client";
export default async function Page() { ... }

// Çözüm: Server Component yap veya useEffect kullan
```

### 3. Route Bulunamadı
```
// Hata: /category/rock sayfası açılmıyor
// Çözüm: app/category/[slug]/page.tsx dosyasının var olduğundan emin ol
```

---

## 📝 İlk Görevler (Öğrenme İçin)

1. ✅ Projeyi çalıştır (`npm run dev`)
2. ✅ Ana sayfayı incele (`app/page.tsx`)
3. ✅ Bir ürün kartına tıkla, detay sayfasını gör
4. ✅ Sepete ürün ekle, sepet sayfasına git
5. ✅ Checkout akışını tamamla
6. 🔨 Yeni bir sayfa ekle (`app/about/page.tsx`)
7. 🔨 Yeni bir bileşen oluştur
8. 🔨 API endpoint'i ekle (`app/api/test/route.ts`)

---

## 💡 İpuçları

1. **Browser DevTools:** React DevTools ve Network tab'ını kullan
2. **Console Logs:** `console.log()` ile debug yap
3. **TypeScript Errors:** Hataları oku, TypeScript sana yardımcı oluyor
4. **Next.js Docs:** Resmi dokümantasyonu sık kullan
5. **Component İsimleri:** PascalCase kullan (`ProductCard`, `CartItem`)

---

## 🎯 Sonraki Adımlar

Projeyi anladıktan sonra:

1. Yeni özellikler ekle
2. Mevcut kodları iyileştir
3. Test yaz (ileride)
4. Performance optimizasyonu yap

---

## 📞 Yardım

- Next.js Docs: https://nextjs.org/docs
- React Docs: https://react.dev
- TypeScript Docs: https://www.typescriptlang.org/docs

**Sorun mu var?** Kodu incele, console'a bak, hata mesajlarını oku! 🚀

