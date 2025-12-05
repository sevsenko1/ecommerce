"use client";

import { useState } from "react";
import type { Category } from "@/components/CategoryCard";

interface ProductFiltersProps {
  categories: Category[];
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  search: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  inStock: boolean | null;
}

export const ProductFilters = ({
  categories,
  onFilterChange,
}: ProductFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    category: "",
    minPrice: 0,
    maxPrice: 5000,
    minRating: 0,
    inStock: null,
  });

  const handleChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const cleared = {
      search: "",
      category: "",
      minPrice: 0,
      maxPrice: 5000,
      minRating: 0,
      inStock: null,
    };
    setFilters(cleared);
    onFilterChange(cleared);
  };

  return (
    <div id="filters-sidebar" className="sticky top-24 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">Filtreler</h2>
        <button
          onClick={clearFilters}
          className="text-sm text-slate-500 hover:text-slate-900"
        >
          Temizle
        </button>
      </div>

      {/* Arama */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Ara</label>
        <input
          type="text"
          placeholder="Ürün adı, sanatçı..."
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
        />
      </div>

      {/* Kategori */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Kategori</label>
        <select
          value={filters.category}
          onChange={(e) => handleChange("category", e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
        >
          <option value="">Tümü</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Fiyat Aralığı */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Fiyat Aralığı
        </label>
        <div className="flex flex-col gap-3">
          <div>
            <label className="mb-1 block text-xs text-slate-500">Minimum</label>
            <input
              type="number"
              placeholder="0"
              value={filters.minPrice || ""}
              onChange={(e) =>
                handleChange("minPrice", parseInt(e.target.value) || 0)
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-lg font-medium focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-500">Maksimum</label>
            <input
              type="number"
              placeholder="5000"
              value={filters.maxPrice || ""}
              onChange={(e) =>
                handleChange("maxPrice", parseInt(e.target.value) || 5000)
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-lg font-medium focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
        </div>
      </div>

      {/* Rating */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">
          Minimum Puan
        </label>
        <select
          value={filters.minRating}
          onChange={(e) => handleChange("minRating", parseFloat(e.target.value))}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-base focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
        >
          <option value={0}>Tümü</option>
          <option value={4}>4.0+</option>
          <option value={4.5}>4.5+</option>
          <option value={4.8}>4.8+</option>
        </select>
      </div>

      {/* Stok Durumu */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Stok</label>
        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="stock"
              checked={filters.inStock === null}
              onChange={() => handleChange("inStock", null)}
              className="text-orange-500"
            />
            <span className="text-sm text-slate-600">Tümü</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="stock"
              checked={filters.inStock === true}
              onChange={() => handleChange("inStock", true)}
              className="text-orange-500"
            />
            <span className="text-sm text-slate-600">Stokta Var</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="stock"
              checked={filters.inStock === false}
              onChange={() => handleChange("inStock", false)}
              className="text-orange-500"
            />
            <span className="text-sm text-slate-600">Tükendi</span>
          </label>
        </div>
      </div>
    </div>
  );
};

