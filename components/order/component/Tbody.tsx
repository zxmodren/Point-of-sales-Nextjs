import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { TransactionData } from "@/types/transaction";

interface TableBodyProps {
  data: TransactionData[];
}

function TableBodyOrders({ data }: TableBodyProps) {
  return (
    <>
      <TableBody>
        {data.map((item) => {
          const totalPrice = item.product.sellprice * item.quantity;
          return (
            <TableRow key={item.id}>
              <TableCell>
                <div className="font-medium">
                  {item.product.productstock.name.charAt(0).toUpperCase() +
                    item.product.productstock.name.slice(1).toLowerCase()}
                </div>
                <div className="hidden text-sm text-muted-foreground md:inline">
                  {item.productId}
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                {item.product.productstock.cat.charAt(0).toUpperCase() +
                  item.product.productstock.cat.slice(1).toLowerCase()}
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                $ {item.product.sellprice}
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {item.quantity}
              </TableCell>
              <TableCell className="text-right">$ {totalPrice}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
}

export default TableBodyOrders;
