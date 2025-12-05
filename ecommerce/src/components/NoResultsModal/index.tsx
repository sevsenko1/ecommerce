"use client";

import { useState } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";

interface NoResultsModalProps {
  searchTerm: string;
  isOpen: boolean;
  onClose: () => void;
}

export const NoResultsModal = ({
  searchTerm,
  isOpen,
  onClose,
}: NoResultsModalProps) => {
  const { addToWishlist } = useWishlist();
  const { showToast } = useToast();
  const [artistName, setArtistName] = useState("");
  const [albumName, setAlbumName] = useState("");

  if (!isOpen) return null;

  const handleAddToWishlist = () => {
    const name = albumName || artistName || searchTerm;
    addToWishlist({
      id: `wishlist-${Date.now()}`,
      name: name,
      image: "/pictures/analogrock/pink-floyd-dark-side.jpg", // Default image
      category: "unknown",
    });
    showToast(`${name} istek listesine eklendi`);
    setArtistName("");
    setAlbumName("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">
            Ürün Bulunamadı
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>
        <p className="mb-6 text-sm text-slate-600">
          <span className="font-semibold">"{searchTerm}"</span> için sonuç
          bulunamadı. İstek listesine ekleyerek bu ürünü talep edebilirsiniz.
        </p>
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Sanatçı Adı (Opsiyonel)
            </label>
            <input
              type="text"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              placeholder="Örn: Pink Floyd"
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Albüm Adı (Opsiyonel)
            </label>
            <input
              type="text"
              value={albumName}
              onChange={(e) => setAlbumName(e.target.value)}
              placeholder="Örn: The Dark Side of the Moon"
              className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              İptal
            </button>
            <button
              onClick={handleAddToWishlist}
              className="flex-1 rounded-xl bg-orange-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-orange-600"
            >
              İstek Listesine Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

