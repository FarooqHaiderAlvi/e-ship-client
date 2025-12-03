import { toast, type ToastOptions } from "react-toastify";

// Default toast options
const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "dark",
};

/**
 * Show success toast (green)
 */
export const showSuccessToast = (message: string, options?: ToastOptions) => {
  toast.success(message, { ...defaultOptions, ...options });
};

/**
 * Show error toast (red)
 */
export const showErrorToast = (message: string, options?: ToastOptions) => {
  console.log("showErrorToast", message);
  toast.error(message, { ...defaultOptions, autoClose: 4000, ...options });
};

/**
 * Show info toast (blue)
 */
export const showInfoToast = (message: string, options?: ToastOptions) => {
  toast.info(message, { ...defaultOptions, ...options });
};

/**
 * Show warning toast (yellow/orange)
 */
export const showWarningToast = (message: string, options?: ToastOptions) => {
  toast.warning(message, { ...defaultOptions, ...options });
};

