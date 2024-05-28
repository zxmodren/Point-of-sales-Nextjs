'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const ErrorPage = ({ error }: { error: Error }) => {
  useEffect(() => {
    toast.error(`An error occurred: ${error.message}`);
  }, [error]);

  return <div>An error occurred: {error.message}</div>;
};

export default ErrorPage;
