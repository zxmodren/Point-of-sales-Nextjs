import { TableBody, TableCell, TableRow } from '@/components/ui/table';
import { TransactionData } from '@/types/transaction';
import { DialogEdit } from './edit';
import { AlertDialogDelete } from './delete';

// Interface for the TableBodyOrders component
interface TableBodyProps {
  data: TransactionData[];
}

// TableBodyOrders component to render the table body for transaction data
function TableBodyOrders({ data }: TableBodyProps) {
  return (
    <>
      <TableBody>
        {data.map((item) => {
          // Calculate the total price for each item
          const totalPrice = item.product.sellprice * item.quantity;

          return (
            // Render a table row for each item
            <TableRow key={item.id}>
              {/* Render the product name */}
              <TableCell>
                <div className="font-medium">
                  {item.product.productstock.name.charAt(0).toUpperCase() +
                    item.product.productstock.name.slice(1).toLowerCase()}
                </div>
                {/* Render the product ID */}
                <div className="hidden text-sm text-muted-foreground md:inline">
                  {item.productId}
                </div>
              </TableCell>
              {/* Render the product category */}
              <TableCell className="hidden md:table-cell">
                {item.product.productstock.cat.charAt(0).toUpperCase() +
                  item.product.productstock.cat.slice(1).toLowerCase()}
              </TableCell>
              {/* Render the product sell price */}
              <TableCell className="hidden md:table-cell">
                $ {item.product.sellprice}
              </TableCell>
              {/* Render the quantity */}
              <TableCell className="hidden sm:table-cell">
                {item.quantity}
              </TableCell>
              {/* Render the total price */}
              <TableCell className="hidden sm:table-cell">
                $ {totalPrice}
              </TableCell>
              {/* Render edit and delete buttons */}
              <TableCell className="text-right">
                <DialogEdit data={item} />
                <AlertDialogDelete data={item} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
}

export default TableBodyOrders;
