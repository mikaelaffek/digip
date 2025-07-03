'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NotificationContainer } from '../src/components/Notification/NotificationService';
import { TranslationProvider } from '../src/i18n';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        refetchOnWindowFocus: false,
      },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <TranslationProvider>
        {children}
        <NotificationContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </TranslationProvider>
    </QueryClientProvider>
  );
}
