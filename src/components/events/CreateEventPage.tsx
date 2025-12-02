'use client';

import { useState } from 'react';
import { Container, Alert } from '@mui/material';
import { EventForm } from '@/components/events/EventForm';
import { useCreateEvent } from '@/hooks/api/useEvents';
import { useEventNavigation } from '@/hooks/useEventNavigation';
import { EventFormData } from '@/lib/validation/eventValidation';
import { getErrorMessage } from '@/lib/utils/errorHandler';

export function CreateEventPage() {
  const { navigateToList } = useEventNavigation();
  const createEvent = useCreateEvent();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: EventFormData) => {
    try {
      setError(null);

      await createEvent.mutateAsync({
        title: data.title,
        description: data.description,
        startDate: data.startDate.toISOString(),
        endDate: data.endDate.toISOString(),
        location: data.location,
        latitude: data.latitude,
        longitude: data.longitude,
        categoryId: data.categoryId,
      });

      navigateToList();
    } catch (err) {
      setError(getErrorMessage(err));
      console.error('Error creating event:', err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <EventForm
        onSubmit={handleSubmit}
        onCancel={navigateToList}
        isSubmitting={createEvent.isPending}
        mode="create"
      />
    </Container>
  );
}
