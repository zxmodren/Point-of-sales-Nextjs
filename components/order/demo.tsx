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
export function Orders() {
  return (
    <Card x-chunk="dashboard-05-chunk-3" className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders from your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeadOrders />
          <TableBodyOrders />
        </Table>
      </CardContent>
    </Card>
  );
}
