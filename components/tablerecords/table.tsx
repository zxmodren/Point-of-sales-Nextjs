import Image from 'next/image';
import { File, ListFilter, MoreHorizontal, PlusCircle } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import TableHeadRecords from './components/TableHead';
import TableBodyRecords from './components/TableBody';
import { fetchRecords } from '@/data/records';
import { PageProps } from '@/types/paginations';

interface Product {
  id: string;
  productId: string;
  quantity: number;
}

interface Recordsdata {
  totalQuantity: number;
  id: string;
  totalAmount: string | null;
  createdAt: Date;
  isComplete: boolean;
  products: Product[];
}

export async function Records(props: PageProps) {
  const pageNumber = Number(props?.searchParams?.page || 1); // Get the page number. Default to 1 if not provided.
  const take = 5;
  const skip = (pageNumber - 1) * take;
  const { data, metadata } = await fetchRecords({ take, skip });
  const convertedData: Recordsdata[] = data.map((item) => ({
    totalQuantity: item.totalQuantity,
    id: item.id,
    totalAmount: item.totalAmount ? item.totalAmount.toString() : null,
    createdAt: item.createdAt,
    isComplete: item.isComplete,
    products: item.products,
  }));
  return (
    <Card x-chunk="dashboard-06-chunk-0" className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Records</CardTitle>
        <CardDescription>Records of Trasactions.</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <Table>
          <TableHeadRecords />
          <TableBodyRecords data={convertedData} />
        </Table>
      </CardContent>
      <CardFooter className="mt-auto">
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  );
}
