'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Boxes } from 'lucide-react';
import { SheetRestock } from './sheetRestock';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

// RestockButtonComponent to render a button for adding a restock product
function RestockButtonComponent(): React.ReactNode {
  const [restockOpen, setRestockOpen] = useState(false);

  // Close the add restock sheet
  const handleRestockClose = () => {
    setRestockOpen(false);
  };

  // Open the restock sheet
  const handleRestockClick = () => {
    setRestockOpen(true);
  };

  return (
    <>
      {/* Button for Restock a product */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" onClick={handleRestockClick}>
              <Boxes className="h-3.5 w-3.5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Restock Product</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {/* SheetRestock component to restock a product */}
      <SheetRestock open={restockOpen} onClose={handleRestockClose} />
    </>
  );
}

export default RestockButtonComponent;
