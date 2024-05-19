/* eslint-disable react/no-unescaped-entities */
"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import * as DialogR from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";

type ProductDetail = {
  sellprice: number;
};

type Data = {
  id: string;
  name: string;
  imageProduct?: string;
  price: number;
  stock: number;
  cat: string;
  Product: ProductDetail[];
};
export function DialogDemo({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [productStocks, setProductStocks] = useState<Data[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<string>("");
  const [selectedResult, setSelectedResult] = useState<Data | null>(null);
  useEffect(() => {
    const fetchProductStocks = async () => {
      try {
        const response = await axios.get<Data[]>("/api/storage");
        setProductStocks(response.data);
      } catch (error) {
        console.error("Error fetching product stocks:", error);
      }
    };

    fetchProductStocks();

    if (searchTerm === "") {
      setSelectedResult(null);
      setSelectedProduct("");
    }
  }, [searchTerm]);

  const handleCancel = () => {
    setSelectedProduct("");
    setSelectedResult(null);
    setSearchTerm("");
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogR.Overlay className="fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogR.Content className="sm:max-w-[425px] fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        <DialogHeader>
          <DialogTitle>Add product</DialogTitle>
          <DialogDescription>
            Add Product here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 max-h-60 overflow-auto z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
              <div className="relative flex-1 md:grow-0">
                <Button
                  type="button"
                  size="icon"
                  value={searchTerm}
                  className="absolute left-2.5 top-2.5 h-4 w-4 bg-transparent">
                  <Search />
                </Button>
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-background pl-8"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
                value={selectedResult?.id ?? selectedProduct}
                onValueChange={(value) => {
                  setSelectedResult(
                    productStocks.find((product) => product.id === value) ??
                      null
                  );
                  setSelectedProduct(value);
                }}>
                {productStocks
                  .filter(
                    (product) =>
                      product.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      product.id.toString().includes(searchTerm.toLowerCase())
                  )
                  .map((product) => (
                    <DropdownMenuRadioItem key={product.id} value={product.id}>
                      {product.name}
                    </DropdownMenuRadioItem>
                  ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="grid gap-4 mt-4">
            {selectedResult && (
              <div
                key={selectedResult.id}
                className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  {selectedResult.id}
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  value={selectedResult.name}
                  readOnly
                />
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  className="col-span-3"
                  type="number"
                  value={
                    selectedResult.Product && selectedResult.Product.length > 0
                      ? selectedResult.Product[0].sellprice
                      : ""
                  }
                  readOnly
                />
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="qty" className="text-right">
                Qty
              </Label>
              <Input id="qty" className="col-span-3" type="number" />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="secondary" onClick={handleCancel}>
            Close
          </Button>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogR.Content>
    </Dialog>
  );
}
