import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

function TableHeadProduct() {
  return (
    <>
      <TableHeader>
        <TableRow>
          <TableHead className="p-4">Name</TableHead>
          <TableHead className="p-4">Category</TableHead>
          <TableHead className="p-4">Sell Price</TableHead>
          <TableHead className="hidden md:table-cell p-4">Stock</TableHead>
          <TableHead className="hidden md:table-cell p-4">Buy Price</TableHead>
          <TableHead className="p-4">
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
    </>
  );
}

export default TableHeadProduct;
