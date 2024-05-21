/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { CatProduct } from "@prisma/client";
import { productSchema } from "@/schema";
import { z } from "zod";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
type Data = {
  id: string;
  sellprice: number;
  productstock: {
    id: string;
    name: string;
    cat: CatProduct;
    stock: number;
    price: number;
  };
};

export function SheetEdit({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: Data;
}) {
  const [productName, setProductName] = useState(data.productstock.name || "");
  const [categoryProduct, setCategories] = useState<string>(
    data.productstock.cat ?? ""
  );
  const [sellPrice, setSellPrice] = useState(data.sellprice || "");
  const [buyPrice, setBuyPrice] = useState(data.productstock.price || "");
  const [stockProduct, setStockProduct] = useState(
    data.productstock.stock || ""
  );
  const [searchTerm, setSearchTerm] = useState<string>(
    data.productstock.cat ?? ""
  );
  const [error, setError] = useState<{ [key: string]: string }>({});

  const buyPriceNumber = parseFloat(String(buyPrice)) || 0;
  const stockProductNumber = parseFloat(String(stockProduct)) || 0;
  const sellPriceNumber = parseFloat(String(sellPrice)) || 0;

  const catProductValues = Object.values(CatProduct);
  const filteredCatProducts = catProductValues.filter((product) =>
    product.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!open) {
      // Reset input value when sheet is closed
      setSearchTerm(data.productstock.cat ?? "");
      setProductName(data.productstock.name || "");
      setSellPrice(data.sellprice || "");
      setStockProduct(data.productstock.stock || "");
      setBuyPrice(data.productstock.price || "");
      setCategories(data.productstock.cat ?? "");
    }
  }, [
    open,
    data.productstock.name,
    data.sellprice,
    data.productstock.stock,
    data.productstock.cat,
    data.productstock.price,
  ]);
  const handleCancel = () => {
    onClose();
    setError({});
  };

  const handleEdit = async () => {
    setLoading(true);
    try {
      const validatedData = productSchema.parse({
        productName,
        buyPrice: buyPriceNumber,
        sellPrice: sellPriceNumber,
        stockProduct: stockProductNumber,
        category: categoryProduct,
      });

      // Send validated data using axios
      const response = await axios.patch(
        `/api/product/${data.productstock.id}`,
        validatedData
      );
      onClose();
      router.refresh();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { [key: string]: string } = {};
        error.errors.forEach((err) => {
          const path = err.path.join(".");
          fieldErrors[path] = err.message;
        });
        setError((prevError) => ({
          ...prevError,
          ...fieldErrors,
        }));
      } else {
        console.error(error);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit product</SheetTitle>
          <SheetDescription>
            Make changes to your product here. Click save when you're done.
          </SheetDescription>
          <div
            onClick={handleCancel}
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <Cross2Icon className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </div>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="productName" className="text-right">
              Product Name
            </Label>
            <Input
              id="productName"
              value={productName}
              onChange={(e) => {
                setProductName(e.target.value);
                setError((prevError) => ({ ...prevError, productName: "" }));
              }}
              className="col-span-3"
            />
            {error?.productName && (
              <div className="col-start-2 col-span-3 text-red-500">
                {error.productName}
              </div>
            )}
            <Label htmlFor="buyPrice" className="text-right">
              Buy Price
            </Label>
            <Input
              id="buyPrice"
              value={buyPrice}
              onChange={(e) => {
                setBuyPrice(e.target.value);
                setError((prevError) => ({ ...prevError, buyPrice: "" }));
              }}
              className="col-span-3"
              type="number"
            />
            {error?.buyPrice && (
              <div className="col-start-2 col-span-3 text-red-500">
                {error.buyPrice}
              </div>
            )}
            <Label htmlFor="sellPrice" className="text-right">
              Sell Price
            </Label>
            <Input
              id="sellPrice"
              value={sellPrice}
              onChange={(e) => {
                setSellPrice(e.target.value);
                setError((prevError) => ({ ...prevError, sellPrice: "" }));
              }}
              className="col-span-3"
              type="number"
            />
            {error?.sellPrice && (
              <div className="col-start-2 col-span-3 text-red-500">
                {error.sellPrice}
              </div>
            )}
            <Label htmlFor="stockProduct" className="text-right">
              Stock
            </Label>
            <Input
              id="stockProduct"
              value={stockProduct}
              onChange={(e) => {
                setStockProduct(e.target.value);
                setError((prevError) => ({ ...prevError, stockProduct: "" }));
              }}
              className="col-span-3"
              type="number"
            />
            {error?.stockProduct && (
              <div className="col-start-2 col-span-3 text-red-500">
                {error.stockProduct}
              </div>
            )}
            <Label htmlFor="categoryProduct" className="text-right">
              Category
            </Label>
            <Select
              value={categoryProduct}
              onValueChange={(newValue) => {
                setCategories(newValue as CatProduct);
                setError((prevError) => ({
                  ...prevError,
                  category: "",
                }));
              }}>
              <SelectTrigger id="categoryProduct" className="min-w-max">
                <SelectValue
                  className="pr-20"
                  placeholder={
                    searchTerm
                      ? searchTerm.charAt(0).toUpperCase() +
                        searchTerm.slice(1).toLowerCase()
                      : "Select Category"
                  }
                  onClick={() => setSearchTerm("")}
                />
              </SelectTrigger>
              {error?.category && (
                <div className="col-start-2 col-span-3 text-red-500">
                  {error.category}
                </div>
              )}
              <SelectContent position="popper">
                <input
                  type="text"
                  value={
                    searchTerm.charAt(0).toUpperCase() +
                    searchTerm.slice(1).toLowerCase()
                  }
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Category"
                  style={{ padding: "5px", margin: "5px 0", width: "100%" }}
                />
                {filteredCatProducts.map((product) => (
                  <SelectItem key={product} value={product}>
                    {product.charAt(0).toUpperCase() +
                      product.slice(1).toLowerCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              onClick={handleEdit}
              type="submit"
              disabled={loading}
              className="text-gray-100">
              {loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}>
                  Loading...
                </motion.div>
              ) : (
                "Save Change"
              )}
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
