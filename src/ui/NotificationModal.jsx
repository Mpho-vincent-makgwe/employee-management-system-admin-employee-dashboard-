"use client";

import { useEffect } from "react";
import CustomButton from "@/components/ui/CustomButton";

export default function NotificationModal({
  icon,
  message,
  title,
  buttonLabel = "",
  confirmText = "",
  cancelText = "",
  onConfirm,
  onCancel,
  show,
  close,
}) {
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && close();
    if (show) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [show, close]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000099] bg-opacity-30">
      <div className="bg-white  rounded-xl w-[568px] h-[400px] max-w-md p-20 text-center shadow-lg relative">
        <div className="absolute top-[14px] left-1/2 transform -translate-x-1/2 w-[80px] h-[8px] bg-gray-200 rounded-[4px] opacity-100" />

        <CustomButton
          onClick={close}
          text="×"
          variant="circle"
          className="absolute top-4 right-4"
          // size="small"
        />

        {icon && (
          <div className="flex justify-center mt-4">
            <div className="p-2 rounded-full bg-gray-200">
              <div className="bg-[#4F46E5] rounded-full p-2">{icon}</div>
            </div>
          </div>
        )}

        <h2 className="text-md mt-2  text-[#4F46E5] mb-2">{title}</h2>

        <p className="text-sm text-gray-700 mb-6 whitespace-pre-line">
          {message}
        </p>

        <div className="flex justify-center gap-4">
          {buttonLabel ? (
            <CustomButton
              text={buttonLabel}
              variant="primary"
              size="medium"
              onClick={onConfirm}
            />
          ) : (
            <>
              <CustomButton
                text={confirmText}
                variant="danger"
                size="medium"
                onClick={onConfirm}
              />

              <CustomButton
                text={cancelText}
                variant="outline"
                size="medium"
                onClick={onCancel}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
