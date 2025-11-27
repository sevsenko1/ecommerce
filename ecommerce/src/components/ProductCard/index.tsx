"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/utils/formatPrice";
import { AddToCartButton } from "@/components/AddToCartButton";
import categoriesData from "@/data/categories.json";

export type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  badges?: string[];
  description?: string;
  highlights?: string[];
};

const categoryMap = Object.fromEntries(
  categoriesData.map((category) => [category.id, category.name]),
);

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative h-64 w-full overflow-hidden bg-slate-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {product.badges?.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur"
            >
              {badge}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">
            {categoryMap[product.category] ?? product.category}
          </p>
          <Link
            href={`/product/${product.id}`}
            className="mt-1 block text-lg font-semibold text-slate-900 hover:text-orange-500"
          >
            {product.name}
          </Link>
        </div>
        <div className="mt-auto flex items-center justify-between">
          <div>
            <p className="text-xl font-bold text-slate-900">
              {formatPrice(product.price)}
            </p>
            <p className="text-xs text-amber-500">
              ★ {product.rating.toFixed(1)} puan
            </p>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
};

