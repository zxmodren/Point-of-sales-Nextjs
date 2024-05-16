import { Badge } from "@/components/ui/badge";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";

function TableBodyOrders() {
  return (
    <>
      <TableBody>
        <TableRow className="bg-accent">
          <TableCell>
            <div className="font-medium">Liam Johnson</div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              liam@example.com
            </div>
          </TableCell>
          <TableCell className="hidden sm:table-cell">Sale</TableCell>
          <TableCell className="hidden sm:table-cell">
            <Badge className="text-xs" variant="secondary">
              Fulfilled
            </Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="font-medium">Olivia Smith</div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              olivia@example.com
            </div>
          </TableCell>
          <TableCell className="hidden sm:table-cell">Refund</TableCell>
          <TableCell className="hidden sm:table-cell">
            <Badge className="text-xs" variant="outline">
              Declined
            </Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell">2023-06-24</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="font-medium">Liam Johnson</div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              liam@example.com
            </div>
          </TableCell>
          <TableCell className="hidden sm:table-cell">Sale</TableCell>
          <TableCell className="hidden sm:table-cell">
            <Badge className="text-xs" variant="secondary">
              Fulfilled
            </Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="font-medium">Noah Williams</div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              noah@example.com
            </div>
          </TableCell>
          <TableCell className="hidden sm:table-cell">Subscription</TableCell>
          <TableCell className="hidden sm:table-cell">
            <Badge className="text-xs" variant="secondary">
              Fulfilled
            </Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell">2023-06-25</TableCell>
          <TableCell className="text-right">$350.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="font-medium">Emma Brown</div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              emma@example.com
            </div>
          </TableCell>
          <TableCell className="hidden sm:table-cell">Sale</TableCell>
          <TableCell className="hidden sm:table-cell">
            <Badge className="text-xs" variant="secondary">
              Fulfilled
            </Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell">2023-06-26</TableCell>
          <TableCell className="text-right">$450.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="font-medium">Liam Johnson</div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              liam@example.com
            </div>
          </TableCell>
          <TableCell className="hidden sm:table-cell">Sale</TableCell>
          <TableCell className="hidden sm:table-cell">
            <Badge className="text-xs" variant="secondary">
              Fulfilled
            </Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
          <TableCell className="text-right">$250.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="font-medium">Olivia Smith</div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              olivia@example.com
            </div>
          </TableCell>
          <TableCell className="hidden sm:table-cell">Refund</TableCell>
          <TableCell className="hidden sm:table-cell">
            <Badge className="text-xs" variant="outline">
              Declined
            </Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell">2023-06-24</TableCell>
          <TableCell className="text-right">$150.00</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <div className="font-medium">Emma Brown</div>
            <div className="hidden text-sm text-muted-foreground md:inline">
              emma@example.com
            </div>
          </TableCell>
          <TableCell className="hidden sm:table-cell">Sale</TableCell>
          <TableCell className="hidden sm:table-cell">
            <Badge className="text-xs" variant="secondary">
              Fulfilled
            </Badge>
          </TableCell>
          <TableCell className="hidden md:table-cell">2023-06-26</TableCell>
          <TableCell className="text-right">$450.00</TableCell>
        </TableRow>
      </TableBody>
    </>
  );
}

export default TableBodyOrders;
