/**
 * Event API Service
 * Handles all event-related API calls
 */

import { apiClient } from './client';
import { API_ROUTES } from '../config';
import type {
  Event,
  CreateEventDto,
  UpdateEventDto,
  EventListParams,
  GlobalResponse,
  PageResponse,
} from '@/types';

export const eventService = {
  
  getEvents: async (params: EventListParams = {}): Promise<PageResponse<Event>> => {
    const response = await apiClient.get<GlobalResponse<PageResponse<Event>>>(
      API_ROUTES.EVENT.LIST,
      { params },
    );

    if (!response.data.data) {
      throw new Error('No events data in response');
    }

    return response.data.data;
  },

  getEventById: async (id: string): Promise<Event> => {
    console.log('!!!!start!!!!')
    const response = await apiClient.get<GlobalResponse<Event>>(
      API_ROUTES.EVENT.GET(id),
    );

    if (!response.data.data) {
      throw new Error('No event data in response');
    }

    return response.data.data;
  },

  getSimilarEvents: async (id: string): Promise<Event[]> => {
    const response = await apiClient.get<GlobalResponse<Event[]>>(
      API_ROUTES.EVENT.SIMILAR(id),
    );

    if (!response.data.data) {
      throw new Error('No similar events data in response');
    }

    return response.data.data;
  },

  createEvent: async (data: CreateEventDto): Promise<Event> => {
    const response = await apiClient.post<GlobalResponse<Event>>(
      API_ROUTES.EVENT.CREATE,
      data,
    );

    if (!response.data.data) {
      throw new Error('No event data in create response');
    }

    return response.data.data;
  },

  updateEvent: async (id: string, data: UpdateEventDto): Promise<Event> => {
    const response = await apiClient.patch<GlobalResponse<Event>>(
      API_ROUTES.EVENT.UPDATE(id),
      data,
    );

    if (!response.data.data) {
      throw new Error('No event data in update response');
    }

    return response.data.data;
  },

  deleteEvent: async (id: string): Promise<void> => {
    await apiClient.delete(API_ROUTES.EVENT.DELETE(id));
  },
};

