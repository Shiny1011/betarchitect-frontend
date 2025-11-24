'use client';

import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface QueryProviderProps {
  children: React.ReactNode;
}

export function QueryProvider({ children }: Readonly<QueryProviderProps>) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // Smart retry logic
            retry: (failureCount, error: any) => {
              // Don't retry for 4xx errors (client errors)
              if (error?.status >= 400 && error?.status < 500) {
                return false;
              }
              // Maximum 2 retries for network errors
              return failureCount < 2;
            },

            // Data freshness time - 5 minutes
            staleTime: 5 * 60 * 1000,

            // Cache storage time - 10 minutes
            gcTime: 10 * 60 * 1000,

            // Refetch behavior
            refetchOnWindowFocus: false, // Disabled for better UX
            refetchOnReconnect: true, // Refetch on network reconnection
            refetchOnMount: true, // Refetch on component mount

            // Online-only requests
            networkMode: 'online',
          },
          mutations: {
            // Don't retry mutations automatically
            retry: (failureCount, error: any) => {
              // Don't retry for client errors
              if (error?.status >= 400 && error?.status < 500) {
                return false;
              }
              // Maximum 1 retry for server errors
              return failureCount < 1;
            },
            networkMode: 'online',
          },
        },
      })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
