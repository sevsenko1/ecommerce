"use client";

import { useMemo, useState } from "react";
import { ProductCard, type Product } from "@/components/ProductCard";
import { ProductFilters, type FilterState } from "@/components/ProductFilters";
import { ProductSearch } from "@/components/ProductSearch";
import { ComingSoon } from "@/components/ComingSoon";
import { NoResultsModal } from "@/components/NoResultsModal";
import type { Category } from "@/components/CategoryCard";

interface ProductListProps {
  products: Product[];
  categories: Category[];
}

export const ProductList = ({ products, categories }: ProductListProps) => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    minPrice: 0,
    maxPrice: 5000,
    minRating: 0,
    inStock: null,
  });
  const [showNoResultsModal, setShowNoResultsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
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
  }, [products, filters]);

  const handleNoResults = (term: string) => {
    setSearchTerm(term);
    setShowNoResultsModal(true);
  };

  return (
    <>
      <div id="product-list-container" className="grid gap-6 lg:grid-cols-12">
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
            <div id="product-search">
              <ProductSearch
                products={products}
                onNoResults={handleNoResults}
                onSearchChange={(term) =>
                  setFilters((prev) => ({ ...prev, search: term }))
                }
              />
            </div>
            <div id="product-results">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-lg font-semibold uppercase tracking-[0.3em] text-slate-500">
                  Öne Çıkan Plaklar
                </p>
                <span className="text-sm text-slate-500">
                  {filteredProducts.length} ürün
                </span>
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
                <div id="product-cards-grid" className="grid gap-6 md:grid-cols-2">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sağ Sidebar - Yakında Geliyor */}
        <aside id="coming-soon" className="lg:col-span-3">
          <ComingSoon />
        </aside>
      </div>

      <NoResultsModal
        searchTerm={searchTerm}
        isOpen={showNoResultsModal}
        onClose={() => setShowNoResultsModal(false)}
      />
    </>
  );
};

