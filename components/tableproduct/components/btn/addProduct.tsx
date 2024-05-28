'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { SheetAdd } from './sheetAdd';

// AddButtonComponent to render a button for adding a new item
function AddButtonComponent(): React.ReactNode {
  const [addOpen, setAddOpen] = useState(false);

  // Close the add sheet
  const handleAddClose = () => {
    setAddOpen(false);
  };

  // Open the add sheet
  const handleAddClick = () => {
    setAddOpen(true);
  };

  return (
    <>
      {/* Button for adding a new item */}
      <Button variant="outline" size="icon" onClick={handleAddClick}>
        <Plus className="h-3.5 w-3.5" />
      </Button>
      {/* SheetAdd component to add a new item */}
      <SheetAdd open={addOpen} onClose={handleAddClose} />
    </>
  );
}

export default AddButtonComponent;
