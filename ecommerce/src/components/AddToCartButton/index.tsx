"use client";

import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
  label?: string;
}

export const AddToCartButton = ({
  product,
  label = "Sepete Ekle",
}: AddToCartButtonProps) => {
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    // Toast'u hemen göster
    showToast(`${product.name} sepete eklendi`);
  };

  return (
    <button
      onClick={handleAddToCart}
      className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-600"
    >
      {label}
    </button>
  );
};

