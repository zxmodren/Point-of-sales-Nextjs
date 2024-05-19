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
import { ReceiptText, Sheet, Plus } from "lucide-react";
import { DialogDemo } from "./component/dialog";
export function Orders() {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const [showTable, setShowTable] = React.useState(true);
  const tableRef = React.useRef<HTMLDivElement>(null);
  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  return (
    <div ref={tableRef} className="w-full h-full">
      <Card
        x-chunk="dashboard-05-chunk-3"
        className="h-full w-full flex flex-col">
        <div className="relative">
          <CardHeader>
            <CardTitle>Orders</CardTitle>
            <CardDescription>Recent orders from your store.</CardDescription>
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
            </div>
          </CardHeader>
        </div>
        <CardContent className="overflow-auto z-0">
          {showTable ? (
            <Table>
              <TableHeadOrders />
              <TableBodyOrders />
            </Table>
          ) : (
            <Detail />
          )}
          <DialogDemo open={dialogOpen} onClose={handleDialogClose} />
        </CardContent>
      </Card>
    </div>
  );
}
