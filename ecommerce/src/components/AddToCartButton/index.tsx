"use client";

import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    stock?: number;
  };
  label?: string;
}

export const AddToCartButton = ({
  product,
  label = "Sepete Ekle",
}: AddToCartButtonProps) => {
  const { addToCart, items } = useCart();
  const { showToast } = useToast();

  const isOutOfStock = (product.stock ?? 0) <= 0;
  const cartItem = items.find((item) => item.id === product.id);
  const currentQuantity = cartItem?.quantity ?? 0;
  const remainingStock = (product.stock ?? 0) - currentQuantity;
  const canAddMore = remainingStock > 0;

  const handleAddToCart = () => {
    if (isOutOfStock) {
      showToast("Bu ürün stokta bulunmamaktadır");
      return;
    }

    if (!canAddMore) {
      showToast("Sepetinizde bu üründen maksimum miktar bulunmaktadır");
      return;
    }

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    showToast(`${product.name} sepete eklendi`);
  };

  if (isOutOfStock) {
    return (
      <button
        disabled
        className="rounded-full bg-slate-300 px-6 py-3 text-sm font-semibold text-slate-500 cursor-not-allowed"
      >
        Tükendi
      </button>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={!canAddMore}
      className={`rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition ${
        canAddMore
          ? "bg-orange-500 shadow-orange-500/30 hover:bg-orange-600"
          : "bg-slate-400 cursor-not-allowed"
      }`}
    >
      {canAddMore ? label : "Maksimum Miktar"}
    </button>
  );
};

