import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

// TableHeadOrders component to render the table head for orders
function TableHeadOrders() {
  return (
    <>
      {/* Render the table header */}
      <TableHeader>
        {/* Render a table row for the header */}
        <TableRow>
          {/* Render the header for product */}
          <TableHead>Product</TableHead>
          {/* Render the header for type (category) */}
          <TableHead className="hidden md:table-cell">Type</TableHead>
          {/* Render the header for price */}
          <TableHead className="hidden md:table-cell">Price</TableHead>
          {/* Render the header for quantity */}
          <TableHead className="hidden sm:table-cell">Qty</TableHead>
          {/* Render the header for amount (total price) */}
          <TableHead className="hidden sm:table-cell">Amount</TableHead>
          {/* Render an empty header for alignment */}
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
    </>
  );
}

export default TableHeadOrders;
