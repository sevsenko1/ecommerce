"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/utils/formatPrice";

interface CartItemProps {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export const CartItem = ({ id, name, image, price, quantity }: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
      <div className="relative h-24 w-24 overflow-hidden rounded-2xl bg-slate-50">
        <Image src={image} alt={name} fill className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-base font-semibold text-slate-900">{name}</p>
            <p className="text-sm text-slate-500">{formatPrice(price)}</p>
          </div>
          <button
            onClick={() => removeFromCart(id)}
            className="text-sm text-slate-400 hover:text-red-500"
          >
            Sil
          </button>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center rounded-full border border-slate-200">
            <button
              className="px-3 py-1 text-lg"
              onClick={() => updateQuantity(id, quantity - 1)}
            >
              -
            </button>
            <span className="px-4 text-sm font-medium">{quantity}</span>
            <button
              className="px-3 py-1 text-lg"
              onClick={() => updateQuantity(id, quantity + 1)}
            >
              +
            </button>
          </div>
          <p className="text-sm text-slate-500">
            Toplam: {formatPrice(price * quantity)}
          </p>
        </div>
      </div>
    </div>
  );
};

