"use client";

import { createContext, useCallback, useContext, useState } from "react";

type Toast = {
  id: number;
  message: string;
  tone: "default" | "success" | "error";
};

type ToastContextValue = {
  toast: (message: string, tone?: Toast["tone"]) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback(
    (message: string, tone: Toast["tone"] = "default") => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, message, tone }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, 3200);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="pointer-events-none fixed bottom-6 right-6 z-50 flex flex-col gap-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`pointer-events-auto rounded-xl border px-4 py-3 text-sm shadow-lg ${
              t.tone === "success"
                ? "border-green-500/20 bg-green-500/10 text-green-700 dark:text-green-400"
                : t.tone === "error"
                  ? "border-red-500/20 bg-red-500/10 text-red-700 dark:text-red-400"
                  : "border-border bg-card text-foreground"
            }`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}