import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Table } from '@/components/ui/table';
import TableHeadProduct from './component/TableHead';
import TableBodyProduct from './component/TableBody';
import { PaginationDemo } from '@/components/paginations/pagination';
import { fetchProduct } from '@/data/product';
import { PageProps } from '@/types/paginations';
import AddButtonComponent from './component/btn/addProduct';
import { SearchInput } from '@/components/search/search';
export default async function TableProduct(props: PageProps) {
  const pageNumber = Number(props?.searchParams?.page || 1); // Get the page number. Default to 1 if not provided.
  const take = 5;
  const skip = (pageNumber - 1) * take;
  const search =
    typeof props?.searchParams?.search === 'string'
      ? props?.searchParams?.search
      : undefined;
  const { data, metadata } = await fetchProduct({ take, skip, query: search });

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your products.</CardDescription>
          </CardHeader>
        </div>
        <div className="relative ml-auto mr-4 flex-1 md:grow-0">
          <SearchInput search={search} />
        </div>
        <div className="mr-3">
          <AddButtonComponent />
        </div>
      </div>
      <CardContent>
        <Table>
          <TableHeadProduct />
          <TableBodyProduct data={data} />
        </Table>
      </CardContent>
      <CardFooter className="mt-auto">
        <PaginationDemo {...metadata} />
      </CardFooter>
    </Card>
  );
}
