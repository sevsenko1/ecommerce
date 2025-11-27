"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/formatPrice";

const steps = [
  { label: "Sepet", status: "done" },
  { label: "Adres", status: "active" },
  { label: "Ödeme", status: "pending" },
];

export default function CheckoutPage() {
  const { items, cartTotal } = useCart();

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-10">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold">Analog Checkout</h1>
        <p className="text-sm text-slate-500">
          Plak & kaset siparişleri için mock bir ödeme ekranı. Anti-statik paketleme ve kargo tercihlerini burada simüle edebilirsin.
        </p>
      </section>

      <div className="flex gap-4">
        {steps.map((step) => (
          <div
            key={step.label}
            className={`flex-1 rounded-2xl border px-4 py-3 text-center text-sm ${
              step.status === "done"
                ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                : step.status === "active"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-400"
            }`}
          >
            {step.label}
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Teslimat Bilgileri</h2>
          <div className="grid gap-4">
            <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Ad Soyad" />
            <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Adres Satırı" />
            <div className="grid grid-cols-2 gap-4">
              <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Şehir" />
              <input className="rounded-2xl border border-slate-200 px-4 py-3" placeholder="Posta Kodu" />
            </div>
          <textarea className="min-h-[100px] rounded-2xl border border-slate-200 px-4 py-3" placeholder="Koleksiyon notları / teslimat talebi" />
          </div>
          <button className="w-full rounded-full bg-slate-900 py-3 text-sm font-semibold text-white">
            Adres Kaydet (Dummy)
          </button>
        </div>

        <aside className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold">Sipariş Özeti</h2>
          <div className="space-y-3 text-sm text-slate-500">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>Genel Toplam</span>
            <span>{formatPrice(cartTotal)}</span>
          </div>
          <div className="rounded-2xl border border-dashed border-orange-200 p-4 text-sm text-orange-500">
            Analog uyarı: Bu demo akışında gerçek ödeme alınmaz, yalnızca arayüz deneyimi paylaşıyoruz.
          </div>
          <Link
            href="/"
            className="block rounded-full bg-gradient-to-r from-orange-500 to-pink-500 py-3 text-center text-sm font-semibold text-white"
          >
            Mock Ödeme Akışını Tamamla
          </Link>
        </aside>
      </div>
    </div>
  );
}

