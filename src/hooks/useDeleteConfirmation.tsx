
import { useState, useCallback } from 'react';

interface UseDeleteConfirmationOptions {
  onConfirm: () => void | Promise<void>;
  title?: string;
  message?: string;
}

export function useDeleteConfirmation({
  onConfirm,
  title = 'Confirm Delete',
  message = 'Are you sure you want to delete this item? This action cannot be undone.',
}: UseDeleteConfirmationOptions) {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsOpen(false);
  }, []);

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

