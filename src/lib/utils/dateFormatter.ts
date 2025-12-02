/**
 * Date Formatting Utilities
 * Centralized date formatting functions for consistent date display across the app
 */

import { format } from 'date-fns';

/**
 * Date format constants
 */
export const DATE_FORMATS = {
  EVENT_DATE: 'PPp', // Dec 1, 2025, 10:00 AM
  FULL_DATETIME: 'PPpp', // Dec 1, 2025 at 10:00:00 AM GMT+2
  SHORT_DATE: 'PP', // Dec 1, 2025
  TIME_ONLY: 'p', // 10:00 AM
  DATETIME_LOCAL: "yyyy-MM-dd'T'HH:mm", // For datetime-local inputs
} as const;

/**
 * Format event date for display in cards and lists
 * @param date - ISO date string or Date object
 * @returns Formatted date string (e.g., "Dec 1, 2025, 10:00 AM")
 */
export function formatEventDate(date: string | Date): string {
  return format(new Date(date), DATE_FORMATS.EVENT_DATE);
}

/**
 * Format full datetime for detailed views
 * @param date - ISO date string or Date object
 * @returns Formatted datetime string (e.g., "Dec 1, 2025 at 10:00:00 AM GMT+2")
 */
export function formatFullDateTime(date: string | Date): string {
  return format(new Date(date), DATE_FORMATS.FULL_DATETIME);
}

/**
 * Format short date without time
 * @param date - ISO date string or Date object
 * @returns Formatted date string (e.g., "Dec 1, 2025")
 */
export function formatShortDate(date: string | Date): string {
  return format(new Date(date), DATE_FORMATS.SHORT_DATE);
}

/**
 * Convert Date to datetime-local input format
 * Used for datetime-local input fields
 * @param date - Date object
 * @returns String in format "YYYY-MM-DDTHH:mm"
 */
export function toDateTimeLocalString(date: Date | null | undefined): string {
  if (!date) return '';
  return format(date, DATE_FORMATS.DATETIME_LOCAL);
}

/**
 * Parse datetime-local string to Date
 * @param dateString - String from datetime-local input
 * @returns Date object or undefined
 */
export function fromDateTimeLocalString(dateString: string): Date | undefined {
  if (!dateString) return undefined;
  return new Date(dateString);
}

/**
 * Format coordinates to fixed decimal places
 * @param lat - Latitude
 * @param lng - Longitude
 * @param decimals - Number of decimal places (default: 6)
 * @returns Formatted coordinate string
 */
export function formatCoordinates(
  lat: number,
  lng: number,
  decimals: number = 6
): string {
  return `${lat.toFixed(decimals)}, ${lng.toFixed(decimals)}`;
}

