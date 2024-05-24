import { TableRow, TableCell } from '@/components/ui/table';
import { motion } from 'framer-motion';
import '@/styles/skeleton.css'; // Pastikan path ini sesuai dengan lokasi file CSS Anda

const SkeletonRow: React.FC = () => {
  const variants = {
    initial: {
      opacity: 0.5,
    },
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1,
        repeat: Infinity,
      },
    },
  };

  return (
    <TableRow>
      <TableCell className="font-medium">
        <motion.div
          className="h-8 skeleton"
          variants={variants}
          initial="initial"
          animate="animate"
        ></motion.div>
      </TableCell>
      <TableCell>
        <motion.div
          className="h-8 skeleton"
          variants={variants}
          initial="initial"
          animate="animate"
        ></motion.div>
      </TableCell>
      <TableCell>
        <motion.div
          className="h-8 skeleton"
          variants={variants}
          initial="initial"
          animate="animate"
        ></motion.div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <motion.div
          className="h-8 skeleton"
          variants={variants}
          initial="initial"
          animate="animate"
        ></motion.div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <motion.div
          className="h-8 skeleton"
          variants={variants}
          initial="initial"
          animate="animate"
        ></motion.div>
      </TableCell>
      <TableCell>
        <motion.div
          className="w-10 h-8 skeleton"
          variants={variants}
          initial="initial"
          animate="animate"
        ></motion.div>
      </TableCell>
    </TableRow>
  );
};

export default SkeletonRow;
