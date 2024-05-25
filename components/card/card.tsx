'use client';
import { Boxes, CircleDollarSign, Handshake } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { getTotal } from '@/data/stock';
function DashboardCard(): React.ReactNode {
  const [totalStock, setTotalStock] = useState<number | null>(null);
  const [totalAmount, setTotalAmount] = useState<number | null>(null);
  const [totalQuantity, setTotalPrdSale] = useState<number | null>(null);

  useEffect(() => {
    getTotal()
      .then(({ totalStock, totalAmount, totalQuantity }) => {
        setTotalStock(totalStock?._sum?.stock);
        setTotalAmount(totalAmount?._sum?.totalAmount);
        setTotalPrdSale(totalQuantity?._sum?.quantity);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const first = {
    initial: {
      x: 20,
      rotate: -5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };
  const second = {
    initial: {
      x: -20,
      rotate: 5,
    },
    hover: {
      x: 0,
      rotate: 0,
    },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2"
    >
      <motion.div
        variants={first}
        className="h-full w-1/3 rounded-2xl bg-gray-100 p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <Boxes size={40} />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Total Product
        </p>
        <p className="border border-red-500 bg-red-100 dark:bg-red-900/20 text-red-600 text-xs rounded-full px-2 py-0.5 mt-4">
          {totalStock ?? 'Loading...'}
        </p>
      </motion.div>
      <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-gray-100 p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
        <CircleDollarSign size={40} />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Income
        </p>
        <Badge
          variant="outline"
          className="border border-green-700 px-2 py-0.5 mt-4"
        >
          <p className="text-green-400">
            <span className="mr-1">$</span>
            {totalAmount ?? 'Loading...'}
          </p>
        </Badge>
      </motion.div>
      <motion.div
        variants={second}
        className="h-full w-1/3 rounded-2xl bg-gray-100 p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center"
      >
        <Handshake size={40} />
        <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
          Total Product Sale
        </p>
        <p className="border border-orange-500 bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-xs rounded-full px-2 py-0.5 mt-4">
          {totalQuantity ?? 'Loading...'}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default DashboardCard;
