import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

// TableHeadProduct component to render the table header for products
function TableHeadProduct() {
  return (
    <>
      {/* Table header */}
      <TableHeader>
        {/* Table row for the header */}
        <TableRow>
          {/* Header for product name */}
          <TableHead className="p-4">Name</TableHead>
          {/* Header for product category */}
          <TableHead className="p-4">Category</TableHead>
          {/* Header for product sell price */}
          <TableHead className="p-4">Sell Price</TableHead>
          {/* Header for product stock (hidden on small screens) */}
          <TableHead className="hidden md:table-cell p-4">Stock</TableHead>
          {/* Header for product buy price (hidden on small screens) */}
          <TableHead className="hidden md:table-cell p-4">Buy Price</TableHead>
          {/* Header for actions (hidden from screen readers) */}
          <TableHead className="p-4">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
    </>
  );
}

export default TableHeadProduct;
