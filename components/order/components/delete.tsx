'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import * as AlertDialogR from '@radix-ui/react-alert-dialog';
import { TransactionData } from '@/types/transaction';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import { ReloadIcon } from '@radix-ui/react-icons';
import eventBus from '@/lib/even';
import { toast } from 'react-toastify';
interface DialogDeleteProps {
  data: TransactionData;
}

export function AlertDialogDelete({ data }: DialogDeleteProps) {
  const [dataId, setDataId] = useState(data.id || '');
  const [productName, setProductName] = useState(
    data.product.productstock.name || ''
  );
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      // Check if the user is online
      const isOnline = navigator.onLine;

      if (!isOnline) {
        toast.error('You are offline. Please check your internet connection.');
        return;
      }

      // Perform the delete request
      const response = await axios.delete(`/api/onsale/${dataId}`);
      // Close the dialog and refresh data
      setDialogOpen(false);
      eventBus.emit('fetchTransactionData');
    } catch (error: unknown) {
      // Handle errors
      if (axios.isAxiosError(error)) {
        toast.error('Server Error:' + error.response?.data);
      } else if (error instanceof Error) {
        toast.error('Error:' + error.message);
      } else {
        toast.error('Unknown error:' + error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={dialogOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => setDialogOpen(true)}
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogR.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{' '}
            {productName} from the order.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className="text-gray-100"
          >
            {loading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              'Delete'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogR.Content>
    </AlertDialog>
  );
}
