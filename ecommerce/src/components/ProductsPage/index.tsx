"use client";

import { useState, useMemo } from "react";
import { ProductFilters, type FilterState } from "@/components/ProductFilters";
import { ComingSoon } from "@/components/ComingSoon";
import { ProductSearch } from "@/components/ProductSearch";
import { ProductCard, type Product } from "@/components/ProductCard";
import { NoResultsModal } from "@/components/NoResultsModal";
import { ProductCardSkeleton } from "@/components/Skeleton/ProductCardSkeleton";
import type { Category } from "@/components/CategoryCard";

interface ProductsPageProps {
  products: Product[];
  categories: Category[];
}

type SortOption = "default" | "price-asc" | "price-desc" | "rating-desc" | "name-asc" | "name-desc";

export const ProductsPage = ({ products, categories }: ProductsPageProps) => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    minPrice: 0,
    maxPrice: 5000,
    minRating: 0,
    inStock: null,
  });
  const [sortBy, setSortBy] = useState<SortOption>("default");
  const [showNoResultsModal, setShowNoResultsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      // Arama filtresi
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          product.name.toLowerCase().includes(searchLower) ||
          product.description?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Kategori filtresi
      if (filters.category && product.category !== filters.category) {
        return false;
      }

      // Fiyat filtresi
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }

      // Rating filtresi
      if (product.rating < filters.minRating) {
        return false;
      }

      // Stok filtresi
      if (filters.inStock !== null) {
        const hasStock = (product.stock ?? 0) > 0;
        if (filters.inStock !== hasStock) return false;
      }

      return true;
    });

    // Sıralama
    const sorted = [...filtered];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating-desc":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name, "tr"));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name, "tr"));
        break;
      default:
        // Varsayılan sıralama (değişiklik yok)
        break;
    }

    return sorted;
  }, [products, filters, sortBy]);

  const handleNoResults = (term: string) => {
    setSearchTerm(term);
    setShowNoResultsModal(true);
  };

  return (
    <>
      <section id="products" className="grid gap-6 lg:grid-cols-12">
        {/* Sol Sidebar - Filtreler */}
        <aside id="product-filters" className="lg:col-span-3">
          <ProductFilters
            categories={categories}
            onFilterChange={setFilters}
          />
        </aside>

        {/* Orta - Ürünler */}
        <div id="product-grid" className="lg:col-span-6">
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-2">
              <h2 className="text-lg font-semibold uppercase tracking-[0.3em] text-slate-500">
                Öne Çıkan Plaklar
              </h2>
              <span className="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700">
                {filteredProducts.length} ürün
              </span>
            </div>
            <div id="product-search">
              <ProductSearch
                products={products}
                onNoResults={handleNoResults}
                onSearchChange={(term) =>
                  setFilters((prev) => ({ ...prev, search: term }))
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500">
                {filteredProducts.length} ürün bulundu
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
              >
                <option value="default">Varsayılan Sıralama</option>
                <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
                <option value="rating-desc">En Yüksek Puan</option>
                <option value="name-asc">İsim: A-Z</option>
                <option value="name-desc">İsim: Z-A</option>
              </select>
            </div>
            {filteredProducts.length === 0 ? (
              <div id="no-results" className="rounded-3xl bg-white p-12 text-center shadow-sm">
                <p className="text-lg font-semibold text-slate-900">
                  Sonuç bulunamadı
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Filtreleri değiştirerek tekrar deneyin
                </p>
              </div>
            ) : (
              <div id="product-cards-grid" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sağ Sidebar - Yakında Geliyor */}
        <aside id="coming-soon" className="lg:col-span-3">
          <ComingSoon />
        </aside>
      </section>

      <NoResultsModal
        searchTerm={searchTerm}
        isOpen={showNoResultsModal}
        onClose={() => setShowNoResultsModal(false)}
      />
    </>
  );
};

