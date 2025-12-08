"use client";

import { useEffect } from "react";

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  variant?: "default" | "success";
}

export const Toast = ({ message, isVisible, onClose, variant = "default" }: ToastProps) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, variant === "success" ? 4000 : 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose, variant]);

  if (!isVisible) return null;

  if (variant === "success") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose} />
        <div className="relative flex items-center gap-4 rounded-3xl bg-gradient-to-br from-emerald-50 to-emerald-100 px-8 py-6 shadow-2xl ring-2 ring-emerald-200 animate-fade-in">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500">
            <span className="text-2xl text-white">✓</span>
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-emerald-900">Başarılı!</p>
            <p className="text-sm font-medium text-emerald-800">{message}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 text-emerald-600 hover:text-emerald-800 transition-colors"
            aria-label="Kapat"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="flex items-center gap-3 rounded-2xl bg-white px-6 py-4 shadow-2xl ring-1 ring-slate-200">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
          <span className="text-xl">✓</span>
        </div>
        <div className="flex flex-col">
          <p className="font-semibold text-slate-900">Başarılı!</p>
          <p className="text-sm text-slate-600">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-slate-400 hover:text-slate-600"
          aria-label="Kapat"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

