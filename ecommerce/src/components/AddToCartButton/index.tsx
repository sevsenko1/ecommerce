"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Toast } from "@/components/Toast";

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
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    setShowToast(true);
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        className="rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/30 transition hover:bg-orange-600"
      >
        {label}
      </button>
      <Toast
        message={`${product.name} sepete eklendi`}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
};

