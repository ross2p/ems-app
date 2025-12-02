'use client';

import { useState, useCallback } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { Container, Box, Typography, Button, Alert } from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { EventFilters } from '@/components/events/EventFilters';
import { EventList } from '@/components/events/EventList';
import { ConfirmationDialog } from '@/components/common/ConfirmationDialog';
import { useEvents, useDeleteEvent } from '@/hooks/api/useEvents';
import { useEventNavigation } from '@/hooks/useEventNavigation';
import { EventFilters as EventFiltersType, EventListParams } from '@/types';
import { parseEventFilters, updateQueryParams } from '@/lib/utils/queryParams';
import { EVENT_CONSTANTS } from '@/lib/constants/events';

export function EventsPageContainer() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { navigateToEvent, navigateToEdit, navigateToCreate } = useEventNavigation();
  const deleteEvent = useDeleteEvent();

  const [filters, setFilters] = useState<EventListParams>(() => {
    const parsed = parseEventFilters(searchParams);
    return {
      ...parsed,
      pageNumber: parsed.pageNumber || EVENT_CONSTANTS.PAGINATION.DEFAULT_PAGE_NUMBER,
      pageSize: parsed.pageSize || EVENT_CONSTANTS.PAGINATION.DEFAULT_PAGE_SIZE,
    };
  });

  const [eventToDelete, setEventToDelete] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const { data, isLoading, error } = useEvents(filters);

  const updateFiltersAndUrl = useCallback(
    (newFilters: EventListParams) => {
      setFilters(newFilters);
      const url = updateQueryParams(pathname, newFilters);
      window.history.pushState({}, '', url);
    },
    [pathname]
  );

  const handleFiltersChange = useCallback(
    (newFilters: EventFiltersType) => {
      updateFiltersAndUrl({
        ...filters,
        ...newFilters,
        pageNumber: EVENT_CONSTANTS.PAGINATION.DEFAULT_PAGE_NUMBER,
      });
    },
    [filters, updateFiltersAndUrl]
  );

  const handleClearFilters = useCallback(() => {
    updateFiltersAndUrl({
      pageNumber: EVENT_CONSTANTS.PAGINATION.DEFAULT_PAGE_NUMBER,
      pageSize: filters.pageSize,
    });
  }, [filters.pageSize, updateFiltersAndUrl]);

  const handlePageChange = useCallback(
    (page: number) => {
      updateFiltersAndUrl({
        ...filters,
        pageNumber: page,
      });
    },
    [filters, updateFiltersAndUrl]
  );

  const handleDeleteEvent = useCallback((id: string) => {
    setEventToDelete(id);
    setDeleteError(null);
  }, []);

  const handleConfirmDelete = async () => {
    if (!eventToDelete) return;

    try {
      await deleteEvent.mutateAsync(eventToDelete);
      setEventToDelete(null);
    } catch (err) {
      setDeleteError('Failed to delete event. Please try again.');
      console.error('Error deleting event:', err);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <Typography variant="h4" component="h1" fontWeight="bold">
          Events
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={navigateToCreate}
          size="large"
        >
          Add Event
        </Button>
      </Box>

      <EventFilters
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onClearFilters={handleClearFilters}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load events. Please try again later.
        </Alert>
      )}

      {deleteError && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setDeleteError(null)}>
          {deleteError}
        </Alert>
      )}

      <EventList
        events={data?.content || []}
        loading={isLoading}
        currentPage={filters.pageNumber || EVENT_CONSTANTS.PAGINATION.DEFAULT_PAGE_NUMBER}
        totalPages={data?.totalPages || 1}
        onPageChange={handlePageChange}
        onViewEvent={navigateToEvent}
        onEditEvent={navigateToEdit}
        onDeleteEvent={handleDeleteEvent}
      />

      <ConfirmationDialog
        open={!!eventToDelete}
        title="Delete Event"
        message="Are you sure you want to delete this event? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirmDelete}
        onCancel={() => setEventToDelete(null)}
        isLoading={deleteEvent.isPending}
        severity="error"
      />
    </Container>
  );
}
