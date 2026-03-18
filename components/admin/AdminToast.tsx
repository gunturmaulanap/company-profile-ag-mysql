"use client";

import { CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

type AdminToastProps = {
  message?: string;
  type?: "success" | "error" | "info";
};

export default function AdminToast({
  message,
  type = "success",
}: AdminToastProps) {
  if (!message) return null;

  const toastVariant = {
    success: "success",
    error: "destructive",
    info: "default",
  } as const;

  const iconColors = {
    success: "text-green-600",
    error: "text-destructive",
    info: "text-primary",
  };

  const icons = {
    success: <CheckCircle2 className="w-4 h-4" />,
    error: <XCircle className="w-4 h-4" />,
    info: <AlertCircle className="w-4 h-4" />,
  };

  return (
    <div className="fixed right-5 top-5 z-[60]">
      <Alert
        variant={toastVariant[type]}
        className="min-w-[280px] max-w-md shadow-lg animate-[fadeout_3.2s_ease-in_forwards]"
      >
        <div className="flex items-start gap-3">
          <div className={`shrink-0 mt-0.5 ${iconColors[type]}`}>
            {icons[type]}
          </div>
          <AlertDescription className="flex-1 font-medium">
            {message}
          </AlertDescription>
        </div>
      </Alert>

      <style>{`@keyframes fadeout { 0%, 85% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-4px); } }`}</style>
    </div>
  );
}
