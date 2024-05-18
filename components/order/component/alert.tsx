"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { AlertDialogContent } from "@radix-ui/react-alert-dialog";

export function PrintAlertDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleCancel = () => {
    onClose();
  };

  const handleDelete = async () => {
    // setLoading(true);
    // try {
    //   const response = await axios.delete(`/api/product/${data.product.id}`);
    //   console.log("Product deleted:", response.data);
    // } catch (error: unknown) {
    //   if (axios.isAxiosError(error)) {
    //     console.error("Server Error:", error.response?.data);
    //   } else if (error instanceof Error) {
    //     console.error("Error:", error.message);
    //   } else {
    //     console.error("Unknown error:", error);
    //   }
    // } finally {
    //   setLoading(false);
    //   onClose();
    //   router.refresh();
    // }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure want to delete?
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
