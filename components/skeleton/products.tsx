import { TableRow, TableCell } from "@/components/ui/table";
import { motion } from "framer-motion";
import "@/styles/skeleton.css"; // Pastikan path ini sesuai dengan lokasi file CSS Anda

const SkeletonRow: React.FC = () => {
  const variants = {
    initial: {
      width: "100%",
    },
    animate: {
      width: ["100%", "80%", "100%"],
      transition: {
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <div className="w-16 h-16 skeleton"></div>
      </TableCell>
      <TableCell className="font-medium">
        <motion.div
          className="h-6 skeleton"
          variants={variants}
          initial="initial"
          animate="animate"></motion.div>
      </TableCell>
      <TableCell>
        <motion.div
          className="h-6 skeleton"
          variants={variants}
          initial="initial"
          animate="animate"></motion.div>
      </TableCell>
      <TableCell>
        <motion.div
          className="h-6 skeleton"
          variants={variants}
          initial="initial"
          animate="animate"></motion.div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <motion.div
          className="h-6 skeleton"
          variants={variants}
          initial="initial"
          animate="animate"></motion.div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <motion.div
          className="h-6 skeleton"
          variants={variants}
          initial="initial"
          animate="animate"></motion.div>
      </TableCell>
      <TableCell>
        <div className="w-10 h-6 skeleton"></div>
      </TableCell>
    </TableRow>
  );
};

export default SkeletonRow;
