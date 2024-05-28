'use client'; // Use client-side rendering

import {
  AlertDialog, // Import AlertDialog component
  AlertDialogAction, // Import AlertDialogAction component
  AlertDialogCancel, // Import AlertDialogCancel component
  AlertDialogDescription, // Import AlertDialogDescription component
  AlertDialogFooter, // Import AlertDialogFooter component
  AlertDialogHeader, // Import AlertDialogHeader component
  AlertDialogTitle, // Import AlertDialogTitle component
} from '@/components/ui/alert-dialog'; // Import components from the alert-dialog module
import eventBus from '@/lib/even'; // Import the event bus from the even module
import * as AlertDialogR from '@radix-ui/react-alert-dialog'; // Import components from Radix UI
import { ReloadIcon } from '@radix-ui/react-icons'; // Import ReloadIcon component from Radix UI icons
import axios from 'axios'; // Import axios for HTTP requests
import { useState, useEffect } from 'react'; // Import useState and useEffect hooks from React
import { toast } from 'react-toastify';
// Define a functional component called AlertDialogDeletetransaction
export function AlertDialogDeletetransaction({
  open, // Boolean to determine if the dialog is open
  onClose, // Function to close the dialog
  transactionId, // ID of the transaction to be deleted
  setTransactionId, // Function to update the transaction ID
}: {
  open: boolean;
  onClose: () => void;
  transactionId: string | null;
  setTransactionId: (id: string | null) => void;
}) {
  const [loading, setLoading] = useState(false); // State variable to track loading state

  const handleCancel = () => {
    onClose(); // Close the dialog when Cancel is clicked
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
        eventBus.emit('fetchTransactionData'); // Emit an event to fetch transaction data
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
