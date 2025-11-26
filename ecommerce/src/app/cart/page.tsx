"use client";

import Link from "next/link";
import { CartItem } from "@/components/CartItem";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/formatPrice";

const perks = [
  "30 gün ücretsiz iade",
  "Ertesi gün kargo",
  "Güvenli ödeme altyapısı",
];

export default function CartPage() {
  const { items, cartTotal, clearCart } = useCart();

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-10 px-4 py-10">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Sepet</h1>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-sm text-slate-400 hover:text-red-500"
            >
              Sepeti temizle
            </button>
          )}
        </div>
        <p className="text-sm text-slate-500">
          {items.length} ürün | {formatPrice(cartTotal)}
        </p>
      </section>

      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="rounded-3xl bg-white p-10 text-center text-slate-500">
              Sepetiniz boş. <Link href="/" className="text-orange-500">Alışverişe</Link> başlayın.
            </div>
          ) : (
            items.map((item) => <CartItem key={item.id} {...item} />)
          )}
        </div>
        <aside className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Sipariş Özeti</h2>
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>Ürünler</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>Genel Toplam</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <Link
            href="/checkout"
            className="block rounded-full bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-white"
          >
            Güvenli Ödeme
          </Link>
          <ul className="space-y-2 text-xs text-slate-500">
            {perks.map((perk) => (
              <li key={perk}>• {perk}</li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}

