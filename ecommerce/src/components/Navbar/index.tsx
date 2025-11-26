"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useFetch } from "@/hooks/useFetch";
import type { Category } from "@/components/CategoryCard";

export const Navbar = () => {
  const { cartCount } = useCart();
  const { data, loading } = useFetch<Category[]>("/api/categories");

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-semibold tracking-tight">
            Trendly
          </Link>
          <Link
            href="/cart"
            className="rounded-full border border-slate-200 px-4 py-1 text-sm font-medium text-slate-900 hover:border-slate-400"
          >
            Sepet ({cartCount})
          </Link>
        </div>
        <nav className="flex flex-wrap gap-2">
          {loading && (
            <span className="text-sm text-slate-400">Kategoriler yükleniyor…</span>
          )}
          {data?.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className="rounded-full border border-slate-200 px-4 py-2 text-sm text-slate-600 transition hover:border-slate-900 hover:text-slate-900"
            >
              {category.name}
            </Link>
          ))}
          <Link
            href="/checkout"
            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white"
          >
            Hızlı Ödeme
          </Link>
        </nav>
      </div>
    </header>
  );
};

