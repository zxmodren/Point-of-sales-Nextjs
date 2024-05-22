import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";

function DateComponent(): React.ReactNode {
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      const formattedDate = format(currentDate, "EEEE, MMMM-yyyy");
      setDate(formattedDate);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-1 justify-center items-center w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-gray-400  dark:bg-black">
      <motion.div
        className="font-roboto text-2xl font-medium text-neutral-800 dark:text-neutral-200"
        style={{ textShadow: "0 0 5px rgba(255, 255, 255, 0.7)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}>
        {date}
      </motion.div>
    </div>
  );
}

export default DateComponent;
