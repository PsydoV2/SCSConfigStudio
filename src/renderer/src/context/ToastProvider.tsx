import Toast from "@renderer/components/Toast";
import { createContext, useContext, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

type ToastType = "success" | "error" | "info";

type ToastContextValue = {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
    duration: number;
    id: number; // ID hilft React, Instanzen sauber zu unterscheiden
  } | null>(null);

  const showToast = (
    message: string,
    type: ToastType = "info",
    duration = 3000
  ) => {
    // Falls bereits ein Toast da ist, setzen wir ihn kurz auf null,
    // um die Animation neu zu triggern (optional)
    setToast(null);

    setTimeout(() => {
      setToast({ message, type, duration, id: Date.now() });
    }, 10);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Portals rendern den Toast außerhalb der normalen Hierarchie direkt in den Body */}
      {toast &&
        createPortal(
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            duration={toast.duration}
            onHide={() => setToast(null)}
          />,
          document.body
        )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastProvider");
  return ctx;
}
