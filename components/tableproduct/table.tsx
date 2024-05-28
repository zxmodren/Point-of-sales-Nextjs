import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Table } from '@/components/ui/table';
import TableHeadProduct from './components/TableHead';
import TableBodyProduct from './components/TableBody';
import { PaginationDemo } from '@/components/paginations/pagination';
import { fetchProduct } from '@/data/product';
import { PageProps } from '@/types/paginations';
import AddButtonComponent from './components/btn/addProduct';
import { SearchInput } from '@/components/search/search';
import { toast } from 'react-toastify';
// TableProduct component to display a table of products
export default async function TableProduct(props: PageProps) {
  // Calculate pagination values
  const pageNumber = Number(props?.searchParams?.page || 1); // Get the page number. Default to 1 if not provided.
  const take = 5;
  const skip = (pageNumber - 1) * take;
  const search =
    typeof props?.searchParams?.search === 'string'
      ? props?.searchParams?.search
      : undefined;
  const result = await fetchProduct({ take, skip, query: search });
  if (!result) {
    // Handle the case where fetchProduct returns undefined, e.g., show an error message
    toast.error('Failed to fetch product data');
    return;
  }
  // Fetch product data based on pagination and search parameters
  const { data, metadata } = result;

  return (
    // Card container for the table
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        {/* Card header with title and description */}
        <div>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your products.</CardDescription>
          </CardHeader>
        </div>
        {/* Search input for filtering products */}
        <div className="relative ml-auto mr-4 flex-1 md:grow-0">
          <SearchInput search={search} />
        </div>
        {/* Add button for adding new products */}
        <div className="mr-3">
          <AddButtonComponent />
        </div>
      </div>
      {/* Card content with table of products */}
      <CardContent>
        <Table>
          <TableHeadProduct />
          <TableBodyProduct data={data} />
        </Table>
      </CardContent>
      {/* Card footer with pagination */}
      <CardFooter className="mt-auto">
        <PaginationDemo {...metadata} />
      </CardFooter>
    </Card>
  );
}
