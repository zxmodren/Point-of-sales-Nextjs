import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

function TableHeadOrders() {
  return (
    <>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead className="hidden sm:table-cell">Type</TableHead>
          <TableHead className="hidden sm:table-cell">Price</TableHead>
          <TableHead className="hidden md:table-cell">Qty</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
    </>
  );
}

export default TableHeadOrders;
