import { format } from 'date-fns';

export const DATE_FORMATS = {
  EVENT_DATE: 'PPp', // Dec 1, 2025, 10:00 AM
  FULL_DATETIME: 'PPpp', // Dec 1, 2025 at 10:00:00 AM GMT+2
  SHORT_DATE: 'PP', // Dec 1, 2025
  TIME_ONLY: 'p', // 10:00 AM
  DATETIME_LOCAL: "yyyy-MM-dd'T'HH:mm", // For datetime-local inputs
} as const;

export function formatEventDate(date: string | Date): string {
  return format(new Date(date), DATE_FORMATS.EVENT_DATE);
}
export function formatFullDateTime(date: string | Date): string {
  return format(new Date(date), DATE_FORMATS.FULL_DATETIME);
}
export function formatShortDate(date: string | Date): string {
  return format(new Date(date), DATE_FORMATS.SHORT_DATE);
}

export function toDateTimeLocalString(date: Date | null | undefined): string {
  if (!date) return '';
  return format(date, DATE_FORMATS.DATETIME_LOCAL);
}

export function fromDateTimeLocalString(dateString: string): Date | undefined {
  if (!dateString) return undefined;
  return new Date(dateString);
}

export function formatCoordinates(
  lat: number,
  lng: number,
  decimals: number = 6
): string {
  return `${lat.toFixed(decimals)}, ${lng.toFixed(decimals)}`;
}

