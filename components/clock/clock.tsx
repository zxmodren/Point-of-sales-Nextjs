'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Define the DigitalClock component
function DigitalClock(): React.ReactNode {
  // State to store the current time as a string
  const [time, setTime] = useState('');

  // useEffect to update the time every second
  useEffect(() => {
    // Set up an interval to update the time every second
    const intervalId = setInterval(() => {
      const date = new Date();
      // Get hours, minutes, and seconds, and pad with zeros if necessary
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      // Format the new time string
      const newTime = `${hours}:${minutes}:${seconds}`;
      // Update the time state
      setTime(newTime);
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-1 justify-center items-center w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-gray-400  dark:bg-black">
      <div
        className="font-roboto text-2xl font-medium text-neutral-800 dark:text-neutral-200 font-roboto"
        style={{ textShadow: '0 0 5px rgba(255, 255, 255, 0.7)' }}
      >
        <motion.span
          animate={{
            rotate: 360, // Rotate the time text
            transition: { duration: 60, ease: 'linear' }, // Set rotation duration and easing
          }}
        >
          {time} {/* Display the current time */}
        </motion.span>
      </div>
    </div>
  );
}

export default DigitalClock;
