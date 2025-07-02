"use client";

import dynamic from 'next/dynamic';

// Use dynamic import to avoid SSR issues with React Query
const TrademarkTable = dynamic(
  () => import('../../src/components/TrademarkTable/TrademarkTable'),
  { ssr: false }
);

export default function TrademarkPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <TrademarkTable />
    </div>
  );
}
