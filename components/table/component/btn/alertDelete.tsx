"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
type Data = {
  id: string;
  product: {
    id: string;
    name: string;
  };
};
export function DeleteAlertDialog({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: Data;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleCancel = () => {
    onClose();
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(`/api/product/${data.product.id}`);
      console.log("Product deleted:", response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Server Error:", error.response?.data);
      } else if (error instanceof Error) {
        console.error("Error:", error.message);
      } else {
        console.error("Unknown error:", error);
      }
    } finally {
      setLoading(false);
      onClose();
      router.refresh();
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure want to delete {data.product.name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the data
            from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
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
              "Delete"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
