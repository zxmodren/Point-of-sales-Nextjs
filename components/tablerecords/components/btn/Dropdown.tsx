'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { DeleteAlertDialog } from './alertDelete';
import { useRouter } from 'next/navigation';
type Products = {
  id: string;
  productId: string;
  quantity: number;
};

type Records = {
  totalQuantity: number;
  id: string;
  totalAmount: string | null;
  createdAt: Date;
  isComplete: boolean;
  products: Products[];
};

const Dropdown = ({ records }: { records: Records }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const route = useRouter();

  const handleDeleteClose = () => {
    setDeleteOpen(false);
  };
  const handleRedirect = () => {
    route.push(`/records/${records.id}`);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleRedirect}>View</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAlertDialog
        open={deleteOpen}
        onClose={handleDeleteClose}
        data={records}
      />
    </>
  );
};

export default Dropdown;
