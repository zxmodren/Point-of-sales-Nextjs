'use client';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import SkeletonRecords from '@/components/skeleton/records';

import { useState, useEffect } from 'react';
import Dropdown from './btn/Dropdown';

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
  products: Product[]; // Menggunakan array untuk produk
}

interface TableBodyRecordsProps {
  data: Recordsdata[];
}

const TableBodyRecords: React.FC<TableBodyRecordsProps> = ({ data }) => {
  const [loading, setLoading] = useState<boolean>(true);

  const [recordsData, setRecordsData] = useState<Recordsdata[]>([]);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setRecordsData(data);
      setLoading(false);
    }, 2000); // Simulate a delay
  }, [data]);

  return (
    <TableBody>
      {loading
        ? Array.from({ length: 5 }).map((_, i) => <SkeletonRecords key={i} />)
        : recordsData.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium pl-4">{item.id}</TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    item.isComplete
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                  }
                >
                  {item.isComplete ? 'Complete' : 'Incomplete'}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell pl-20 pr-20">
                {item.totalQuantity}
              </TableCell>
              <TableCell className="pl-5">
                $ {item.totalAmount ? item.totalAmount.toString() : 'N/A'}
              </TableCell>
              <TableCell className="hidden md:table-cell pl-3">
                {item.createdAt.toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Dropdown records={item} />
              </TableCell>
            </TableRow>
          ))}
    </TableBody>
  );
};

export default TableBodyRecords;
