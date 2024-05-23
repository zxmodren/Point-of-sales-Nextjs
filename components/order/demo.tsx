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

export function Orders() {
  const [dialogAddOpen, setDialogAddOpen] = useState(false);
  const [dialogDeleteOpen, setDialogDeleteOpen] = useState(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [taxRate, setTaxRate] = useState<number>(0.1);
  const [transactionData, setTransactionData] = useState<TransactionData[]>([]);
  const [showTable, setShowTable] = useState(true);
  const [loading, setLoading] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTransactionId = localStorage.getItem('transactionId');
    if (savedTransactionId) {
      setTransactionId(savedTransactionId);
    }

    let isMounted = true;

    const fetchTransactionData = async () => {
      if (isMounted) {
        try {
          if (!transactionId) {
            setTransactionData([]);
            return;
          }

          const response = await axios.get(
            `/api/transactions/${transactionId}`
          );
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

    const handleEventBusEvent = () => {
      fetchTransactionData();
    };

    eventBus.on('fetchTransactionData', handleEventBusEvent);
    return () => {
      isMounted = false;
      eventBus.removeListener('fetchTransactionData', handleEventBusEvent);
    };
  }, [transactionId]);

  const createTransaction = async () => {
    if (!transactionId) {
      setLoading(true);
      try {
        const response = await axios.post('/api/transactions');
        if (response.status === 201) {
          const { id } = response.data;
          localStorage.setItem('transactionId', id);
          setTransactionId(id);
          setLoading(false);
          setDialogAddOpen(true);
        } else {
          console.error('Failed to create transaction');
        }
      } catch (error) {
        console.error('An error occurred:', error);
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
              taxRate={taxRate}
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
