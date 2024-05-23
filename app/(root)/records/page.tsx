import React from 'react';
import { Records } from '@/components/tablerecords/table';
import { PageProps } from '@/types/paginations';
const page = async (props: PageProps) => {
  return (
    <div className="w-full h-full">
      <Records {...props} />
    </div>
  );
};

export default page;
