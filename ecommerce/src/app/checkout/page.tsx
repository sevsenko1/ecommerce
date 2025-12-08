"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { formatPrice } from "@/utils/formatPrice";

type CheckoutStep = "address" | "payment";

interface AddressForm {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartTotal, clearCart } = useCart();
  const { showToast } = useToast();
  const [step, setStep] = useState<CheckoutStep>("address");
  const [addressForm, setAddressForm] = useState<AddressForm>({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Partial<AddressForm>>({});

  // Sepet boşsa ana sayfaya yönlendir
  useEffect(() => {
    if (items.length === 0 && step === "address") {
      router.push("/");
    }
  }, [items.length, router, step]);

  const validateAddress = (): boolean => {
    const newErrors: Partial<AddressForm> = {};
    
    if (!addressForm.fullName.trim()) {
      newErrors.fullName = "Ad Soyad gereklidir";
    }
    if (!addressForm.address.trim()) {
      newErrors.address = "Adres gereklidir";
    }
    if (!addressForm.city.trim()) {
      newErrors.city = "Şehir gereklidir";
    }
    if (!addressForm.postalCode.trim()) {
      newErrors.postalCode = "Posta kodu gereklidir";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAddress()) {
      setStep("payment");
    }
  };

  const handlePaymentComplete = () => {
    clearCart();
    showToast("Siparişiniz başarıyla verildi! En kısa sürede hazırlanacak.", "success");
    setTimeout(() => {
      router.push("/");
    }, 4000);
  };

  const steps = [
    { label: "Sepet", status: "done" },
    { label: "Adres", status: step === "address" ? "active" : "done" },
    { label: "Ödeme", status: step === "payment" ? "active" : step === "address" ? "pending" : "done" },
  ];

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-10">
        <div className="rounded-3xl bg-white p-10 text-center shadow-sm">
          <p className="text-lg text-slate-600">Sepetiniz boş.</p>
          <Link href="/" className="mt-4 inline-block text-orange-500 hover:text-orange-600">
            Alışverişe başla →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-10 px-4 py-10">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-semibold">Sipariş Onayı</h1>
        <p className="text-sm text-slate-500">
          Plak & kaset siparişleriniz için teslimat bilgilerinizi girin ve ödeme adımına geçin.
        </p>
      </section>

      <div className="flex gap-4">
        {steps.map((stepItem) => (
          <div
            key={stepItem.label}
            className={`flex-1 rounded-2xl border px-4 py-3 text-center text-sm ${
              stepItem.status === "done"
                ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                : stepItem.status === "active"
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-400"
            }`}
          >
            {stepItem.label}
          </div>
        ))}
      </div>

      {step === "address" ? (
        <div className="grid gap-8 lg:grid-cols-2">
          <form onSubmit={handleAddressSubmit} className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Teslimat Bilgileri</h2>
            <div className="grid gap-4">
              <div>
                <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-slate-700">
                  Ad Soyad <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={addressForm.fullName}
                  onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                  className={`w-full rounded-2xl border px-4 py-3 ${
                    errors.fullName ? "border-red-300" : "border-slate-200"
                  } focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                  placeholder="Ad Soyad"
                  required
                />
                {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
              </div>
              <div>
                <label htmlFor="address" className="mb-2 block text-sm font-medium text-slate-700">
                  Adres Satırı <span className="text-red-500">*</span>
                </label>
                <input
                  id="address"
                  type="text"
                  value={addressForm.address}
                  onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                  className={`w-full rounded-2xl border px-4 py-3 ${
                    errors.address ? "border-red-300" : "border-slate-200"
                  } focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                  placeholder="Adres Satırı"
                  required
                />
                {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="mb-2 block text-sm font-medium text-slate-700">
                    Şehir <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="city"
                    type="text"
                    value={addressForm.city}
                    onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                    className={`w-full rounded-2xl border px-4 py-3 ${
                      errors.city ? "border-red-300" : "border-slate-200"
                    } focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                    placeholder="Şehir"
                    required
                  />
                  {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
                </div>
                <div>
                  <label htmlFor="postalCode" className="mb-2 block text-sm font-medium text-slate-700">
                    Posta Kodu <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="postalCode"
                    type="text"
                    value={addressForm.postalCode}
                    onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                    className={`w-full rounded-2xl border px-4 py-3 ${
                      errors.postalCode ? "border-red-300" : "border-slate-200"
                    } focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                    placeholder="Posta Kodu"
                    required
                  />
                  {errors.postalCode && <p className="mt-1 text-xs text-red-500">{errors.postalCode}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="notes" className="mb-2 block text-sm font-medium text-slate-700">
                  Koleksiyon Notları / Teslimat Talebi
                </label>
                <textarea
                  id="notes"
                  value={addressForm.notes}
                  onChange={(e) => setAddressForm({ ...addressForm, notes: e.target.value })}
                  className="min-h-[100px] w-full rounded-2xl border border-slate-200 px-4 py-3 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                  placeholder="Koleksiyon notları / teslimat talebi"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Adresi Kaydet ve Devam Et
            </button>
          </form>

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
          </aside>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Ödeme Bilgileri</h2>
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm font-medium text-slate-900">Teslimat Adresi</p>
                <p className="mt-1 text-sm text-slate-600">{addressForm.fullName}</p>
                <p className="text-sm text-slate-600">{addressForm.address}</p>
                <p className="text-sm text-slate-600">
                  {addressForm.city} {addressForm.postalCode}
                </p>
                {addressForm.notes && (
                  <p className="mt-2 text-xs text-slate-500">{addressForm.notes}</p>
                )}
              </div>
              <div className="rounded-2xl border border-dashed border-slate-200 p-6 text-center">
                <div className="mb-3 text-4xl">💳</div>
                <p className="text-sm text-slate-600">
                  Ödeme bilgileri bu demo akışında toplanmamaktadır.
                </p>
              </div>
              <button
                onClick={handlePaymentComplete}
                className="w-full rounded-full bg-gradient-to-r from-orange-500 to-pink-500 py-3 text-center text-sm font-semibold text-white transition hover:from-orange-600 hover:to-pink-600"
              >
                Siparişi Tamamla
              </button>
              <button
                onClick={() => setStep("address")}
                className="w-full rounded-full border border-slate-200 py-3 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Geri Dön
              </button>
            </div>
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
          </aside>
        </div>
      )}
    </div>
  );
}

