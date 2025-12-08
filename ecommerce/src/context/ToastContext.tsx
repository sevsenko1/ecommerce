"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { Toast } from "@/components/Toast";

type ToastVariant = "default" | "success";

interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toastMessage, setToastMessage] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [variant, setVariant] = useState<ToastVariant>("default");

  const showToast = (message: string, toastVariant: ToastVariant = "default") => {
    setToastMessage(message);
    setVariant(toastVariant);
    setIsVisible(true);
  };

  const handleClose = () => {
    setIsVisible(false);
    // Toast kapandıktan sonra mesajı temizle
    setTimeout(() => setToastMessage(""), 300);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <Toast
        message={toastMessage}
        isVisible={isVisible}
        onClose={handleClose}
        variant={variant}
      />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error("useToast must be used within ToastProvider");
  return context;
};

