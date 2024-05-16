import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

function TableHeadFeed() {
  return (
    <>
      <TableHeader>
        <TableRow>
          <TableHead className="hidden w-[100px] sm:table-cell">
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Sell Price</TableHead>
          <TableHead className="hidden md:table-cell">Stock</TableHead>
          <TableHead className="hidden md:table-cell">Buy Price</TableHead>
          <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead>
        </TableRow>
      </TableHeader>
    </>
  );
}

export default TableHeadFeed;
