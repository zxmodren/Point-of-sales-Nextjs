import React from 'react';
import TableProduct from '@/components/tableproduct/table';
import { PageProps } from '@/types/paginations';
import ErrorBoundary from '@/components/toaster/toaster';
const page = async (props: PageProps) => {
  return (
    <div className="w-full h-full">
      <ErrorBoundary>
        <TableProduct {...props} />
      </ErrorBoundary>
    </div>
  );
};

export default page;
