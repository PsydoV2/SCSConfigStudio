import { useEffect, useState } from "react";
import type { ToastType } from "../../context/ToastContext";

interface ToastProps {
  toast: { id: number; message: string; type: ToastType };
  onDismiss: (id: number) => void;
  duration?: number;
}

const ICONS: Record<ToastType, string> = {
  success: "✓",
  error:   "✕",
  warning: "⚠",
  info:    "ℹ",
};

export function Toast({ toast, onDismiss, duration = 3200 }: ToastProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const startExit  = setTimeout(() => setExiting(true), duration);
    const remove     = setTimeout(() => onDismiss(toast.id), duration + 320);
    return () => { clearTimeout(startExit); clearTimeout(remove); };
  }, [toast.id, duration, onDismiss]);

  return (
    <div
      className={`toast toast--${toast.type} ${exiting ? "toast--exit" : "toast--enter"}`}
      onClick={() => { setExiting(true); setTimeout(() => onDismiss(toast.id), 320); }}
    >
      <span className={`toast__icon toast__icon--${toast.type}`}>
        {ICONS[toast.type]}
      </span>
      <span className="toast__message">{toast.message}</span>
    </div>
  );
}
