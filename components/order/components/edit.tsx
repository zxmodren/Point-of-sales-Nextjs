/* eslint-disable react/no-unescaped-entities */
'use client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import * as DialogR from '@radix-ui/react-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pencil } from 'lucide-react';
import { TransactionData } from '@/types/transaction';
import { useState } from 'react';
import { orderSchema } from '@/schema';
import axios from 'axios';
import { z } from 'zod';
import { ReloadIcon } from '@radix-ui/react-icons';
import eventBus from '@/lib/even';
import { toast } from 'react-toastify';
// Interface for the DialogEdit component
interface DialogEditProps {
  data: TransactionData;
}

// DialogEdit component
export function DialogEdit({ data }: DialogEditProps) {
  // State hooks
  const [productName, setProductName] = useState(
    data.product.productstock.name || ''
  );
  const [productId, setProducId] = useState(data.productId || '');
  const [dataId, setDataId] = useState(data.id || '');
  const [qTy, setqTy] = useState(data.quantity || '');
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Convert quantity to number
  const qTyNumber = parseFloat(String(qTy)) || 0;

  // Handle edit function
  const handleEdit = async () => {
    setLoading(true);
    try {
      // Check if the user is online
      const isOnline = navigator.onLine;

      if (!isOnline) {
        toast.error('You are offline. Please check your internet connection.');
        return;
      }
      const validatedData = orderSchema.parse({
        qTy: qTyNumber,
      });

      // Send validated data using axios
      const response = await axios.patch(
        `/api/onsale/${dataId}`,
        validatedData
      );
      setDialogOpen(false);
      eventBus.emit('fetchTransactionData');
    } catch (error: unknown) {
      if (error instanceof z.ZodError) {
        // Handle validation errors
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          fieldErrors[path] = err.message;
        });
        setError((prevError) => ({
          ...prevError,
          ...fieldErrors,
        }));
      } else {
        // Handle other types of errors
        toast.error(
          'An unexpected error occurred: ' + (error as Error).message
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel function
  const handleCancel = () => {
    setDialogOpen(false);
  };

  // Return JSX for the component
  return (
    <Dialog open={dialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="mr-4"
          onClick={() => setDialogOpen(true)}
        >
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogR.Overlay className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogR.Content className="sm:max-w-[425px] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        <DialogHeader>
          <DialogTitle>Edit Order</DialogTitle>
          <DialogDescription>
            Make changes to the order here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="id" className="text-right">
              Id
            </Label>
            <Input id="id" value={productId} className="col-span-3" readOnly />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              value={productName}
              className="col-span-3"
              readOnly
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="qty" className="text-right">
              Qty
            </Label>
            <Input
              id="qty"
              type="number"
              value={qTy}
              className="col-span-3"
              onChange={(e) => {
                setqTy(e.target.value);
                setError((prevError) => ({ ...prevError, qTy: '' }));
              }}
            />
            {error?.qTy && (
              <div className="col-start-2 col-span-3 text-red-500">
                {error.qTy}
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={handleCancel}>
            Close
          </Button>
          <Button
            onClick={handleEdit}
            type="submit"
            disabled={loading}
            className="text-gray-100"
          >
            {loading ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              'Save change'
            )}
          </Button>
        </DialogFooter>
      </DialogR.Content>
    </Dialog>
  );
}
