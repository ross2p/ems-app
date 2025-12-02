/**
 * Google Maps Provider
 * Single instance of Google Maps loader for the entire app
 * Prevents multiple loader instances and ensures consistent configuration
 */

'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import { MAPS_CONFIG } from '@/lib/config';

const libraries: ('places')[] = ['places'];

interface GoogleMapsContextType {
  isLoaded: boolean;
  loadError: Error | undefined;
}

const GoogleMapsContext = createContext<GoogleMapsContextType>({
  isLoaded: false,
  loadError: undefined,
});

export const useGoogleMaps = () => useContext(GoogleMapsContext);

interface GoogleMapsProviderProps {
  children: ReactNode;
}

export function GoogleMapsProvider({ children }: GoogleMapsProviderProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: MAPS_CONFIG.API_KEY,
    libraries,
  });

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
}

