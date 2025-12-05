"use client";

import { useMemo, useState } from "react";
import { ProductCard, type Product } from "@/components/ProductCard";
import { ProductSearch } from "@/components/ProductSearch";
import { NoResultsModal } from "@/components/NoResultsModal";
import type { FilterState } from "@/components/ProductFilters";
import type { Category } from "@/components/CategoryCard";

interface ProductsSectionProps {
  products: Product[];
  categories: Category[];
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export const ProductsSection = ({
  products,
  categories,
  filters,
  onFiltersChange,
}: ProductsSectionProps) => {
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
      <div id="products-section" className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold uppercase tracking-[0.3em] text-slate-500">
            Ürünler
          </h2>
          <span className="text-sm text-slate-500">
            {filteredProducts.length} ürün
          </span>
        </div>
        <div id="product-search">
          <ProductSearch
            products={products}
            onNoResults={handleNoResults}
            onSearchChange={(term) =>
              onFiltersChange({ ...filters, search: term })
            }
          />
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

      <NoResultsModal
        searchTerm={searchTerm}
        isOpen={showNoResultsModal}
        onClose={() => setShowNoResultsModal(false)}
      />
    </>
  );
};

