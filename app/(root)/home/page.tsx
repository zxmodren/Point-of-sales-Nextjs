import React from 'react';
import { BentoGridHome } from '@/components/bento/bentodemo';
import ErrorBoundary from '@/components/toaster/toaster';
const page = () => {
  return (
    <div className="w-full">
      <ErrorBoundary>
        <BentoGridHome />
      </ErrorBoundary>
    </div>
  );
};

export default page;
