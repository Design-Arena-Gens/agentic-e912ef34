'use client';

import dynamic from 'next/dynamic';

const BlockbusterStore = dynamic(() => import('@/components/BlockbusterStore'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-white text-2xl">Loading Blockbuster Store...</div>
    </div>
  ),
});

export default function Home() {
  return (
    <main className="w-full h-screen overflow-hidden">
      <BlockbusterStore />
    </main>
  );
}
