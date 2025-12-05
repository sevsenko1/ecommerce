"use client";

import Image from "next/image";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";

export const ComingSoon = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { showToast } = useToast();

  const handleRemove = (id: string, name: string) => {
    removeFromWishlist(id);
    showToast(`${name} istek listesinden kaldırıldı`);
  };

  if (items.length === 0) {
    return (
      <div id="coming-soon-empty" className="rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
        <div className="flex flex-col items-center justify-center space-y-4 py-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-3xl">
            ⏳
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Yakında Geliyor
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              İstek listesine eklediğiniz ürünler burada görünecek
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="coming-soon-list" className="space-y-4 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Yakında Geliyor</h3>
        <span className="rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
          {items.length}
        </span>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="group flex gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:shadow-md"
          >
            <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900 line-clamp-2">
                  {item.name}
                </p>
                <p className="mt-1 text-xs text-slate-500">{item.category}</p>
              </div>
              <button
                onClick={() => handleRemove(item.id, item.name)}
                className="mt-2 text-xs text-slate-400 hover:text-red-500"
              >
                Kaldır
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

