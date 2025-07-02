"use client";

import { toast, ToastContainer, ToastOptions } from 'react-toastify';
// CSS is now imported in the layout file

// Default toast configuration
const defaultOptions: ToastOptions = {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

// Notification service for the application
export const NotificationService = {
  // Success notification
  success: (message: string, options?: ToastOptions) => {
    return toast.success(message, { ...defaultOptions, ...options });
  },
  
  // Error notification
  error: (message: string, options?: ToastOptions) => {
    return toast.error(message, { ...defaultOptions, ...options });
  },
  
  // Info notification
  info: (message: string, options?: ToastOptions) => {
    return toast.info(message, { ...defaultOptions, ...options });
  },
  
  // Warning notification
  warning: (message: string, options?: ToastOptions) => {
    return toast.warning(message, { ...defaultOptions, ...options });
  },
  
  // Default notification
  default: (message: string, options?: ToastOptions) => {
    return toast(message, { ...defaultOptions, ...options });
  },
  
  // Dismiss a specific toast
  dismiss: (toastId?: string | number) => {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  },
  
  // Dismiss all toasts
  dismissAll: () => {
    toast.dismiss();
  },
  
  // Update an existing toast
  update: (toastId: string | number, message: string, options?: ToastOptions) => {
    toast.update(toastId, { 
      render: message,
      ...options
    });
  }
};

// Toast container component to be included in the app layout
export const NotificationContainer = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
};
