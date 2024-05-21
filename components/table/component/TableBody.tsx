"use client";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import Image from "next/image";
import Dropdown from "./btn/Dropdown";
import { Badge } from "@/components/ui/badge";
import { CatProduct } from "@prisma/client";
import SkeletonRow from "@/components/skeleton/tabel";
import { useState, useEffect } from "react";
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

interface TableBodyFeedProps {
  data: ProductData[];
}

const TableBodyFeed: React.FC<TableBodyFeedProps> = ({ data }) => {
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
              <TableCell className="hidden sm:table-cell">
                <Image
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src="/bank-card-svgrepo-com.svg"
                  width="64"
                  loading="lazy"
                />
              </TableCell>
              <TableCell className="font-medium">
                {item.productstock.name}
              </TableCell>
              <TableCell>
                <Badge variant="outline">
                  {item.productstock.cat.charAt(0).toUpperCase() +
                    item.productstock.cat.slice(1).toLowerCase()}
                </Badge>
              </TableCell>
              <TableCell>$ {item.sellprice}</TableCell>
              <TableCell className="hidden md:table-cell">
                {item.productstock.stock}
              </TableCell>
              <TableCell className="hidden md:table-cell">
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

export default TableBodyFeed;
