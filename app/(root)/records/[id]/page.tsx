'use client';
import { Copy, Printer } from 'lucide-react';

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
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { TransactionData } from '@/types/transaction';
import { useReactToPrint } from 'react-to-print';

export default function Page({ params }: { params: { id: string } }) {
  const [transactionData, setTransactionData] = useState<TransactionData[]>([]);
  const [printing, setPrinting] = useState(false);
  const componentRef = useRef<HTMLDivElement>(null);
  let taxRate = 10;
  let subtotal = 0;
  transactionData.forEach((item) => {
    subtotal += item.product.sellprice * item.quantity;
  });
  const tax = subtotal * (taxRate / 100);
  const total = subtotal + tax;

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

  useEffect(() => {
    let isMounted = true;

    const fetchTransactionData = async () => {
      if (isMounted) {
        try {
          if (!params.id) {
            return;
          }

          const response = await axios.get(`/api/transactions/${params.id}`);
          if (response.status === 200 && isMounted) {
            const data = response.data;
            setTransactionData(Array.isArray(data) ? data : [data]);
          } else if (response.status === 404 && isMounted) {
            setTransactionData([]);
          } else {
            console.error('Failed to fetch transaction data');
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            if (error.response && error.response.status === 404 && isMounted) {
              setTransactionData([]);
            } else {
              console.error(
                'An error occurred while fetching transaction data:',
                error
              );
            }
          } else {
            console.error('An unexpected error occurred:', error);
          }
        }
      }
    };

    fetchTransactionData();
    return () => {
      isMounted = false;
    };
  }, [params.id]);

  return (
    <div className="w-full h-full">
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
      <Card
        className="w-full flex flex-col h-full print-card overflow-hidden print:w-full print:max-w-[80mm] print:p-4 print:border print:text-[12px] print:font-mono"
        ref={componentRef}
      >
        <CardHeader className="flex flex-row items-start bg-muted/50 print-card-header">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              {params.id}
            </CardTitle>
            <CardDescription>Date: November 23, 2023</CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-1 print:hidden">
            <Button
              size="icon"
              variant="outline"
              className="h-8 gap-1"
              onClick={handlePrint}
              disabled={total === 0 || printing}
            >
              <Printer />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm print-card-content">
          <div className="grid gap-3">
            <div className="font-semibold">Order Details</div>
            <ul className="grid gap-3">
              {transactionData.map((item, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    {item.product.productstock.name} x{' '}
                    <span>{item.quantity}</span>
                  </span>
                  <span>
                    ${(item.product.sellprice * item.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
            <Separator className="my-2" />
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
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 mt-auto"></CardFooter>
      </Card>
    </div>
  );
}
