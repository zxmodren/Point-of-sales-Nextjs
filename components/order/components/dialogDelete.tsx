'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import eventBus from '@/lib/even';
import * as AlertDialogR from '@radix-ui/react-alert-dialog';
import { ReloadIcon } from '@radix-ui/react-icons';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

export function AlertDialogDeletetransaction({
  open,
  onClose,
  transactionId,
  setTransactionId,
}: {
  open: boolean;
  onClose: () => void;
  transactionId: string | null;
  setTransactionId: (id: string | null) => void;
}) {
  const [loading, setLoading] = useState(false);
  const handleCancel = () => {
    onClose();
  };

  const handleDelete = async () => {
    setLoading(true); // Set loading state to true
    try {
      // Check if the user is online
      const isOnline = navigator.onLine;

      if (!isOnline) {
        toast.error('You are offline. Please check your internet connection.');
        return;
      }

      const response = await axios.delete(`/api/transactions/${transactionId}`); // Send a DELETE request to delete the transaction
      if (response.status === 200) {
        onClose(); // Close the dialog
        localStorage.removeItem('transactionId'); // Remove the transactionId from localStorage
        setTransactionId(null); // Set the transactionId to null
      } else if (response.status === 404) {
        // Data not found in the database, remove transactionId from localStorage
        localStorage.removeItem('transactionId');
        setTransactionId(null);
        toast.warn('Transaction not found in the database.');
      } else {
        toast.error('Failed to delete transaction');
      }
    } catch (error: unknown) {
      // Handle errors
      if (error instanceof Error) {
        toast.error('Error deleting transaction: ' + error.message);
      }
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <AlertDialog open={open}>
      {' '}
      {/* Render the AlertDialog component with open state */}
      <AlertDialogR.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        {/* Render the AlertDialog content */}
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete
            Transaction with Id: {transactionId} and remove data from server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* Render the AlertDialogFooter */}
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete} // Call handleDelete function when clicked
            disabled={loading} // Disable the button when loading
            className="text-gray-100"
          >
            {loading ? ( // Show loading indicator if loading is true
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />{' '}
                {/* Render the ReloadIcon with spinning animation */}
                Please wait
              </>
            ) : (
              'Delete' // Show 'Delete' text when not loading
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogR.Content>
    </AlertDialog>
  );
}
