"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { SheetAdd } from "./sheetAdd";
function AddButtonComponent(): React.ReactNode {
  const [addOpen, setAddOpen] = useState(false);

  const handleAddClose = () => {
    setAddOpen(false);
  };

  const handleAddClick = () => {
    setAddOpen(true);
  };

  return (
    <>
      <>
        <Button variant="outline" size="icon" onClick={handleAddClick}>
          <Plus className="h-3.5 w-3.5" />
        </Button>
      </>
      <SheetAdd open={addOpen} onClose={handleAddClose} />
    </>
  );
}

export default AddButtonComponent;
