"use client";

import { useCallback } from 'react';
import { ToastOptions } from 'react-toastify';
import { NotificationService } from '../components/Notification/NotificationService';

/**
 * Custom hook for using notifications throughout the application
 * Provides a convenient way to show different types of notifications
 */
export const useNotification = () => {
  const showSuccess = useCallback((message: string, options?: ToastOptions) => {
    return NotificationService.success(message, options);
  }, []);

  const showError = useCallback((message: string, options?: ToastOptions) => {
    return NotificationService.error(message, options);
  }, []);

  const showInfo = useCallback((message: string, options?: ToastOptions) => {
    return NotificationService.info(message, options);
  }, []);

  const showWarning = useCallback((message: string, options?: ToastOptions) => {
    return NotificationService.warning(message, options);
  }, []);

  const showDefault = useCallback((message: string, options?: ToastOptions) => {
    return NotificationService.default(message, options);
  }, []);

  const dismiss = useCallback((toastId?: string | number) => {
    NotificationService.dismiss(toastId);
  }, []);

  const dismissAll = useCallback(() => {
    NotificationService.dismissAll();
  }, []);

  const update = useCallback((toastId: string | number, message: string, options?: ToastOptions) => {
    NotificationService.update(toastId, message, options);
  }, []);

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showDefault,
    dismiss,
    dismissAll,
    update
  };
};
