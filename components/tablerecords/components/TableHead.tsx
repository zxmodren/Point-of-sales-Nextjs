import { TableHead, TableHeader, TableRow } from '@/components/ui/table';

function TableHeadRecords() {
  return (
    <>
      <TableHeader>
        <TableRow>
          <TableHead className="p-4">Transactions Id</TableHead>
          <TableHead className="p-4">Status</TableHead>
          <TableHead className="hidden md:table-cell p-4">
            Total Product Sales
          </TableHead>
          <TableHead className="p-4">Total Amount</TableHead>
          <TableHead className="hidden md:table-cell p-4">Create At</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
    </>
  );
}

export default TableHeadRecords;
