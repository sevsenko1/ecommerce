"use client";

import { useState } from "react";
import { ProductFilters, type FilterState } from "@/components/ProductFilters";
import { ComingSoon } from "@/components/ComingSoon";
import { ProductsSection } from "@/components/ProductsSection";
import type { Product } from "@/components/ProductCard";
import type { Category } from "@/components/CategoryCard";

interface ProductsSectionWrapperProps {
  products: Product[];
  categories: Category[];
}

export const ProductsSectionWrapper = ({
  products,
  categories,
}: ProductsSectionWrapperProps) => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    minPrice: 0,
    maxPrice: 5000,
    minRating: 0,
    inStock: null,
  });

  return (
    <section id="products" className="grid gap-6 lg:grid-cols-12">
      {/* Sol Sidebar - Filtreler */}
      <aside id="product-filters" className="lg:col-span-2">
        <ProductFilters
          categories={categories}
          onFilterChange={setFilters}
        />
      </aside>

      {/* Orta - Ürünler */}
      <div id="product-grid" className="lg:col-span-8">
        <ProductsSection
          products={products}
          categories={categories}
          filters={filters}
          onFiltersChange={setFilters}
        />
      </div>

      {/* Sağ Sidebar - Yakında Geliyor */}
      <aside id="coming-soon" className="lg:col-span-2">
        <ComingSoon />
      </aside>
    </section>
  );
};

