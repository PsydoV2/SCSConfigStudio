import { useEffect, useState } from "react";

type ToastProps = {
  message: string;
  type?: "success" | "error" | "info";
  duration?: number; // in ms
  onHide?: () => void;
};

export default function Toast({
  message,
  type = "info",
  duration = 3000,
  onHide,
}: ToastProps) {
  const [visible, setVisible] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Timer für das Ausblenden starten
    const hideTimer = setTimeout(() => {
      setIsExiting(true); // Startet die "Slide-Out" Animation
    }, duration);

    // Timer für das endgültige Entfernen aus dem DOM
    const removeTimer = setTimeout(() => {
      setVisible(false);
      onHide?.();
    }, duration + 300); // 300ms zusätzlich für die Animation

    return () => {
      clearTimeout(hideTimer);
      clearTimeout(removeTimer);
    };
  }, [duration, onHide]);

  if (!visible) return null;

  return (
    <div className={`toast-container ${type} ${isExiting ? "exit" : "enter"}`}>
      <span className="toast-text">{message}</span>
    </div>
  );
}
