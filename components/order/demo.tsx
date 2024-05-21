"use client";
import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table } from "@/components/ui/table";
import TableHeadOrders from "./component/Thead";
import TableBodyOrders from "./component/Tbody";
import FullscreenButton from "@/components/fullscreen/fullscreen";
import Detail from "./component/detail";
import { Button } from "@/components/ui/button";
import { ReceiptText, Sheet, Plus, BadgePlus, Delete } from "lucide-react";
import { DialogDemo } from "./component/dialog";
import axios from "axios";
import { TransactionData } from "@/types/transaction";
import { useRouter } from "next/navigation";
import eventBus from "@/lib/even";

export function Orders() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [transactionId, setTransactionId] = React.useState<string | null>(null);
  const [taxRate, setTaxRate] = React.useState<number>(0.1); // Tambahkan state untuk taxRate
  const [transactionData, setTransactionData] = React.useState<
    TransactionData[]
  >([]);
  const [showTable, setShowTable] = React.useState(true);
  const tableRef = React.useRef<HTMLDivElement>(null);
  const router = useRouter();

  React.useEffect(() => {
    const savedTransactionId = localStorage.getItem("transactionId");
    if (savedTransactionId) {
      setTransactionId(savedTransactionId);
    }

    let isMounted = true;

    const fetchTransactionData = async () => {
      if (transactionId && isMounted) {
        try {
          const response = await axios.get(
            `/api/transactions/${transactionId}`
          );
          if (response.status === 200 && isMounted) {
            const data = response.data;
            setTransactionData(Array.isArray(data) ? data : [data]);
          } else {
            console.error("Failed to fetch transaction data");
          }
        } catch (error) {
          console.error(
            "An error occurred while fetching transaction data:",
            error
          );
        }
      }
    };

    fetchTransactionData();

    const handleEventBusEvent = () => {
      fetchTransactionData();
    };

    eventBus.on("fetchTransactionData", handleEventBusEvent);

    return () => {
      isMounted = false;
      eventBus.removeListener("fetchTransactionData", handleEventBusEvent);
    };
  }, [transactionId]);

  const createTransaction = async () => {
    try {
      const response = await axios.post("/api/transactions");
      if (response.status === 201) {
        const { id } = response.data;
        localStorage.setItem("transactionId", id);
        setTransactionId(id);
      } else {
        console.error("Failed to create transaction");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const deleteTransactionId = () => {
    localStorage.removeItem("transactionId");
    setTransactionId(null);
  };

  const handleTaxRateChange = (newTaxRate: number) => {
    setTaxRate(newTaxRate);
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
                  onClick={() => setShowTable(!showTable)}>
                  {showTable ? <ReceiptText /> : <Sheet />}
                </Button>
              </div>
              <div className="pl-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setDialogOpen(true)}>
                  <Plus />
                </Button>
              </div>
              <div className="pl-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => createTransaction()}>
                  <BadgePlus />
                </Button>
              </div>
              <div className="pl-1">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => deleteTransactionId()}>
                  <Delete />
                </Button>
              </div>
              <div className="pl-1">
                <label htmlFor="taxRate" className="pr-2">
                  Tax Rate:
                </label>
                <input
                  id="taxRate"
                  type="number"
                  step="0.01"
                  value={taxRate}
                  onChange={(e) =>
                    handleTaxRateChange(parseFloat(e.target.value))
                  }
                  className="border border-gray-300 rounded p-1"
                />
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
              taxRate={taxRate} // Tambahkan taxRate ke komponen Detail
            />
          )}
          <DialogDemo
            open={dialogOpen}
            onClose={handleDialogClose}
            transactionId={transactionId}
          />
        </CardContent>
      </Card>
    </div>
  );
}
