'use client';
import { Printer } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TransactionData } from '@/types/transaction';
import axios from 'axios';
import { z } from 'zod';
import { useState } from 'react';
import { toast } from 'react-toastify';
import eventBus from '@/lib/even';
import { ReloadIcon } from '@radix-ui/react-icons';

interface DetailProps {
  data: TransactionData[];
  transactionId: string | null;
  setTransactionId: (id: string | null) => void;
}

// Detail component
export default function Detail({
  data,
  transactionId,
  setTransactionId,
}: DetailProps) {
  // Ref for the component to be printed
  const componentRef = useRef<HTMLDivElement>(null);

  // State for loading, printing, and error handling
  const [loading, setLoading] = useState(false);
  const [printing, setPrinting] = useState(false);
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [taxRate, setTaxRate] = useState<number>(0);

  // Calculating subtotal, tax, and total
  let subtotal = 0;
  data.forEach((item) => {
    subtotal += item.product.sellprice * item.quantity;
  });
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

  // Other calculations
  const totalNumber = parseFloat(String(total)) || 0;
  const qTyNumber = data.map((item) => parseFloat(String(item.quantity)));
  const productIds = data.map((item) => item.productId).join(', ');
  const currentDate = format(new Date(), 'MMMM dd, yyyy');

  // Fetching tax rate from the server
  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const isOnline = navigator.onLine;

        if (!isOnline) {
          toast.error(
            'You are offline. Please check your internet connection.'
          );
          return;
        }

        const response = await axios.get('/api/shopdata');
        const shopdata = response.data.data;

        if (response.status === 200) {
          setTaxRate(shopdata.tax);
        } else {
          toast.error('Failed to fetch data: ' + shopdata.error);
        }
      } catch (error: any) {
        toast.error(
          'Failed to fetch data: ' +
            (error.response?.data.error || error.message)
        );
      }
    };

    fetchShopData();
  }, []);

  // Printing function using useReactToPrint
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Receipt',
    onBeforeGetContent: () => {
      setPrinting(true);
    },
    onAfterPrint: () => {
      setPrinting(false);
    },
  });

  // Checkout function
  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await axios.patch(`/api/transactions/${transactionId}`, {
        totalAmount: totalNumber,
        qTy: qTyNumber,
        productId: productIds,
      });

      handlePrint();

      localStorage.removeItem('transactionId');
      setTransactionId(null);

      eventBus.emit('fetchTransactionData');
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        toast.error('Validation errors:' + error.errors);
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          fieldErrors[path] = err.message;
        });
        setError((prevError) => ({
          ...prevError,
          ...fieldErrors,
        }));
      } else {
        toast.error('Error during checkout:' + (error as Error).message);
      }
    } finally {
      setLoading(false);
    }
  };

  // JSX rendering
  return (
    <div>
      {/* Styling for print media */}
      <style jsx>{`
        @media print {
          @page {
            size: 80mm 100mm; /* Sesuaikan dengan ukuran kertas thermal Anda */
          }
          /* Gaya cetakan lainnya */
          .print-card {
            width: 80mm;
            max-width: 80mm;
            padding: 4mm;
            border: none;
            font-size: 12px;
            font-family: 'Courier New', Courier, monospace;
          }
          .print-card-header {
            background-color: #f0f0f0;
          }
          .print-card-content {
            padding: 0;
          }
        }
      `}</style>
      {/* Card component for displaying receipt details */}
      <Card
        className="print-card overflow-hidden print:w-full print:max-w-[80mm] print:p-4 print:border print:text-[12px] print:font-mono"
        ref={componentRef}
      >
        {/* Card header */}
        <CardHeader className="print-card-header flex flex-row items-start bg-muted/50">
          {/* Left side content */}
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              {transactionId}
            </CardTitle>
            <CardDescription>Date: {currentDate}</CardDescription>
          </div>
          {/* Right side content */}
          <div className="ml-auto flex items-center gap-1 print:hidden">
            {/* Button for printing receipt */}
            <Button
              size="icon"
              variant="outline"
              className="h-8 gap-1"
              onClick={handleCheckout}
              disabled={total === 0 || !transactionId || printing || loading}
            >
              {/* Icon for the button */}
              {loading ? <ReloadIcon className="animate-spin" /> : <Printer />}
            </Button>
          </div>
        </CardHeader>
        {/* Card content */}
        <CardContent className="print-card-content p-6 text-sm">
          <div className="grid gap-3">
            <div className="font-semibold">Order Details</div>
            {/* List of ordered items */}
            <ul className="grid gap-3">
              {data.map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {item.product.productstock.name.charAt(0).toUpperCase() +
                      item.product.productstock.name
                        .slice(1)
                        .toLowerCase()}{' '}
                    x <span>{item.quantity}</span>
                  </span>
                  <span>
                    ${(item.product.sellprice * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            {/* Separator */}
            <Separator className="my-2" />
            {/* Subtotal, tax, and total */}
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>${tax.toFixed(2)}</span>
              </li>
              <li className="flex items-center justify-between font-semibold">
                <span className="text-muted-foreground">Total</span>
                <span>${total.toFixed(2)}</span>
              </li>
            </ul>
          </div>
        </CardContent>
        {/* Card footer */}
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3"></CardFooter>
      </Card>
    </div>
  );
}
