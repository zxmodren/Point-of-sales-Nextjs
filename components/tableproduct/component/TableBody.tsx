'use client';
import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import Dropdown from './btn/Dropdown';
import { Badge } from '@/components/ui/badge';
import { CatProduct } from '@prisma/client';
import SkeletonRow from '@/components/skeleton/products';
import { useState, useEffect } from 'react';
interface ProductData {
  id: string;
  sellprice: number;
  productstock: {
    id: string;
    name: string;
    cat: CatProduct;
    stock: number;
    price: number;
  };
}

interface TableBodyProductProps {
  data: ProductData[];
}

const TableBodyProduct: React.FC<TableBodyProductProps> = ({ data }) => {
  const [loading, setLoading] = useState<boolean>(true);

  const [productData, setProductData] = useState<ProductData[]>([]);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setProductData(data);
      setLoading(false);
    }, 2000); // Simulate a delay
  }, [data]);

  return (
    <TableBody>
      {loading
        ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
        : productData.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="hidden sm:table-cell pl-4">
                <Image
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src="/bank-card-svgrepo-com.svg"
                  width="64"
                  loading="lazy"
                />
              </TableCell>
              <TableCell className="font-medium pl-4">
                {item.productstock.name}
              </TableCell>
              <TableCell className="pl-4">
                <Badge variant="outline">
                  {item.productstock.cat.charAt(0).toUpperCase() +
                    item.productstock.cat.slice(1).toLowerCase()}
                </Badge>
              </TableCell>
              <TableCell className="pl-5">$ {item.sellprice}</TableCell>
              <TableCell className="hidden md:table-cell pl-6">
                {item.productstock.stock}
              </TableCell>
              <TableCell className="hidden md:table-cell pl-4">
                $ {item.productstock.price}
              </TableCell>
              <TableCell>
                <Dropdown product={item} />
              </TableCell>
            </TableRow>
          ))}
    </TableBody>
  );
};

export default TableBodyProduct;
