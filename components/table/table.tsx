import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Table } from "@/components/ui/table";
import TableHeadFeed from "./component/TableHead";
import TableBodyFeed from "./component/TableBody";
import { PaginationDemo } from "./component/pagination";
import { fetchProduct } from "@/data/product";
import { PageProps } from "@/types/paginations";
import AddButtonComponent from "./component/btn/addProduct";

export default async function TableFeed(props: PageProps) {
  const pageNumber = Number(props?.searchParams?.page || 1); // Get the page number. Default to 1 if not provided.
  const take = 5;
  const skip = (pageNumber - 1) * take;
  const { data, metadata } = await fetchProduct({ take, skip });

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div>
          <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>Manage your products.</CardDescription>
          </CardHeader>
        </div>
        <div className="mr-3">
          <AddButtonComponent />
        </div>
      </div>
      <CardContent>
        <Table>
          <TableHeadFeed />
          <TableBodyFeed data={data} />
        </Table>
      </CardContent>
      <CardFooter>
        <PaginationDemo {...metadata} />
      </CardFooter>
      {/* <SheetAdd open={addOpen} onClose={handleAddClose} /> */}
    </Card>
  );
}
