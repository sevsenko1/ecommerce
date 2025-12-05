"use client";

import { useState } from "react";
import type { Product } from "@/components/ProductCard";

interface ProductSearchProps {
  products: Product[];
  onNoResults: (searchTerm: string) => void;
  onSearchChange: (searchTerm: string) => void;
}

export const ProductSearch = ({
  products,
  onNoResults,
  onSearchChange,
}: ProductSearchProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      onSearchChange("");
      return;
    }

    onSearchChange(searchTerm);

    const found = products.some(
      (product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    if (!found) {
      onNoResults(searchTerm);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <input
        type="text"
        placeholder="Ürün ara..."
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          onSearchChange(e.target.value);
        }}
        className="w-full rounded-full border border-slate-200 bg-white px-6 py-3 pr-12 text-sm shadow-sm transition focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-orange-500 p-2 text-white transition hover:bg-orange-600"
        aria-label="Ara"
      >
        🔍
      </button>
    </form>
  );
};

