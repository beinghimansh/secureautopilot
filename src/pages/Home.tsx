
import React from 'react';
import { Suspense, lazy } from 'react';
import Loading from '@/components/common/Loading';

// Lazily load the Home component to improve performance
const HomeContent = lazy(() => import('@/components/home/Home'));

const HomePage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <HomeContent />
    </Suspense>
  );
};

export default HomePage;
