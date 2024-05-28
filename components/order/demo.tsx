'use client';
import { useState, useEffect, useRef } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Table } from '@/components/ui/table';
import TableHeadOrders from './components/Thead';
import TableBodyOrders from './components/Tbody';
import FullscreenButton from '@/components/fullscreen/fullscreen';
import Detail from './components/detail';
import { Button } from '@/components/ui/button';
import { ReceiptText, Sheet, Plus, Trash2, Delete } from 'lucide-react';
import { DialogAdd } from './components/dialogAdd';
import axios from 'axios';
import { TransactionData } from '@/types/transaction';
import eventBus from '@/lib/even';
import { ReloadIcon } from '@radix-ui/react-icons';
import { AlertDialogDeletetransaction } from './components/dialogDelete';
import { toast } from 'react-toastify';
export function Orders() {
  const [dialogAddOpen, setDialogAddOpen] = useState(false);
  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [transactionData, setTransactionData] = useState<TransactionData[]>([]);
  const [showTable, setShowTable] = useState(true);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedTransactionId = localStorage.getItem('transactionId');
    if (typeof window !== 'undefined' && storedTransactionId) {
      setTransactionId(storedTransactionId);
    }
  }, []);

  useEffect(() => {
    // Fetch transaction data when component mounts or transactionId changes
    const fetchTransactionData = async () => {
      try {
        if (!transactionId) {
          setTransactionData([]);
          return;
        }

        // Check if the user is online
        const isOnline = navigator.onLine;

        if (!isOnline) {
          toast.error(
            'You are offline. Please check your internet connection.'
          );
          return;
        }

        const response = await axios.get(`/api/transactions/${transactionId}`);
        if (response.status === 200) {
          const data = response.data;
          setTransactionData(Array.isArray(data) ? data : [data]);
        } else {
          console.error('Failed to fetch transaction data');
        }
      } catch (error: any) {
        if (error.response && error.response.status === 405) {
          // Data not found, remove transactionId from localStorage
          localStorage.removeItem('transactionId');
          setTransactionId(null);
          toast.warn('Transaction not found in the database.');
        } else if (error.response && error.response.status === 404) {
          // Data not found, no need to show error
          setTransactionData([]);
        } else {
          toast.error(
            'An error occurred while fetching transaction data:' + error
          );
        }
      }
    };

    fetchTransactionData();

    const handleEventBusEvent = () => {
      fetchTransactionData();
    };

    const handleEventBusEventClear = () => {
      setTransactionData([]);
    };

    // Subscribe to eventBus event to fetch transaction data
    eventBus.on('fetchTransactionData', handleEventBusEvent);

    // Subscribe to eventBus event to fetch transaction data
    eventBus.on('clearTransactionData', handleEventBusEventClear);

    // Clean up event listener
    return () => {
      eventBus.removeListener('fetchTransactionData', handleEventBusEvent);
    };
  }, [transactionId]);

  const createTransaction = async () => {
    // Create new transaction if transactionId is not set
    if (!transactionId) {
      setLoading(true);
      try {
        // Check if the user is online
        const isOnline = navigator.onLine;

        if (!isOnline) {
          toast.error(
            'You are offline. Please check your internet connection.'
          );
          return;
        }

        const response = await axios.post('/api/transactions');
        if (response.status === 201) {
          const { id } = response.data;
          localStorage.setItem('transactionId', id);
          setTransactionId(id);
          setLoading(false);
        } else {
          toast.error('Failed to create transaction');
          setLoading(false);
          return;
        }
      } catch (error) {
        toast.error('An error occurred:' + error);
        setLoading(false);
        return;
      }
    }

    setDialogAddOpen(true);
  };

  const handleDialogAddOpen = () => {
    createTransaction();
  };

  const handleDialogDeleteOpen = () => {
    setDialogDeleteOpen(true);
  };

  const handleDialogAddClose = () => {
    setDialogAddOpen(false);
  };

  const handleDialogDeleteClose = async () => {
    setDialogDeleteOpen(false);
  };

  return (
    <div ref={tableRef} className="w-full h-full">
      <Card className="h-full w-full flex flex-col">
        <div className="relative">
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>{transactionId}</CardDescription>
            <FullscreenButton targetRef={tableRef} />
            <div className="flex items-center justify-start">
              <div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowTable(!showTable)}
                >
                  {showTable ? <ReceiptText /> : <Sheet />}
                </Button>
              </div>
              <div className="pl-1">
                <Button
                  variant="outline"
                  size="icon"
                  disabled={loading}
                  onClick={handleDialogAddOpen}
                >
                  {loading ? <ReloadIcon className="animate-spin" /> : <Plus />}
                </Button>
              </div>
              <div className="pl-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleDialogDeleteOpen}
                  disabled={!transactionId}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          </CardHeader>
        </div>
        <CardContent className="overflow-auto z-0">
          {showTable ? (
            <Table>
              <TableHeadOrders />
              <TableBodyOrders data={transactionData} />
            </Table>
          ) : (
            <Detail
              data={transactionData}
              transactionId={transactionId}
              setTransactionId={setTransactionId}
            />
          )}
          <DialogAdd
            open={dialogAddOpen}
            onClose={handleDialogAddClose}
            transactionId={transactionId}
          />
          <AlertDialogDeletetransaction
            open={dialogDeleteOpen}
            onClose={handleDialogDeleteClose}
            transactionId={transactionId}
            setTransactionId={setTransactionId}
          />
        </CardContent>
      </Card>
    </div>
  );
}
