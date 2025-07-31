'use client';

import { useEffect } from 'react';

export default function NotificationModal({
  icon,
  message,
  buttonLabel = '',
  confirmText = '',
  cancelText = '',
  onConfirm,
  onCancel,
  show,
  close,
}) {
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && close();
    if (show) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [show, close]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#00000099] bg-opacity-30">
      <div className="bg-white border border-[#4F46E5] rounded-xl w-full max-w-md p-6 text-center shadow-lg relative">
        
       
        <button
          onClick={close}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 focus:outline-none text-xl"
        >
          &times;
        </button>

       
        {icon && (
          <div className="flex justify-center mb-4">
            <div className="bg-[#4F46E5] rounded-full p-2">{icon}</div>
          </div>
        )}

       
        <h2 className="text-lg font-semibold text-[#4F46E5] mb-2">Successful</h2>

      
        <p className="text-sm text-gray-700 mb-6 whitespace-pre-line">{message}</p>

     
        <div className="flex justify-center gap-4">
          {buttonLabel ? (
            <button
              onClick={onConfirm}
              className="bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-medium px-6 py-2 rounded-sm focus:outline-none"
            >
              {buttonLabel}
            </button>
          ) : (
            <>
              <button
                onClick={onConfirm}
                className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-md focus:outline-none"
              >
                {confirmText}
              </button>
              <button
                onClick={onCancel}
                className="border border-indigo-600 text-indigo-600 hover:bg-indigo-50 text-sm font-medium px-4 py-2 rounded-md focus:outline-none"
              >
                {cancelText}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
