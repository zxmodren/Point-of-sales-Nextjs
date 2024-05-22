"use client";
import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { motion } from "framer-motion";

function DigitalClock(): React.ReactNode {
  const [time, setTime] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const date = new Date();
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const seconds = date.getSeconds().toString().padStart(2, "0");
      const newTime = `${hours}:${minutes}:${seconds}`;
      setTime(newTime);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-1 justify-center items-center w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-gray-400  dark:bg-black">
      <div
        className="font-roboto text-2xl font-medium text-neutral-800 dark:text-neutral-200 font-roboto"
        style={{ textShadow: "0 0 5px rgba(255, 255, 255, 0.7)" }}>
        <motion.span
          animate={{
            rotate: 360,
            transition: { duration: 60, ease: "linear" },
          }}>
          {time}
        </motion.span>
      </div>
    </div>
  );
}

export default DigitalClock;
