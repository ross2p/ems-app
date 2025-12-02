/**
 * Delete Confirmation Hook
 * Manages confirmation dialog state for delete operations
 */

import { useState, useCallback } from 'react';

interface UseDeleteConfirmationOptions {
  onConfirm: () => void | Promise<void>;
  title?: string;
  message?: string;
}

/**
 * Hook for handling delete confirmations
 * Returns dialog state and control functions
 */
export function useDeleteConfirmation({
  onConfirm,
  title = 'Confirm Delete',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
}: UseDeleteConfirmationOptions) {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Open confirmation dialog
   */
  const openDialog = useCallback(() => {
    setIsOpen(true);
  }, []);

  /**
   * Close confirmation dialog
   */
  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

  /**
   * Handle confirmation
   */
  const handleConfirm = useCallback(async () => {
    await onConfirm();
    closeDialog();
  }, [onConfirm, closeDialog]);

  return {
    isOpen,
    openDialog,
    closeDialog,
    handleConfirm,
    title,
    message,
  };
}

