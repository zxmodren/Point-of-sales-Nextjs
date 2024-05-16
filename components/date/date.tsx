"use client";
import React, { useState } from "react";

function DateComponent(): React.ReactNode {
  const [date, setDate] = React.useState<string>("");

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const currentDate = new Date();
      const monthIndex = currentDate.getMonth();
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const month = months[monthIndex];
      const year = currentDate.getFullYear().toString();
      const dayOfWeek = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
      });
      const newDate = `${dayOfWeek}, ${month}-${year}`;
      setDate(newDate);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-1 justify-center items-center w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-gray-400  dark:bg-black">
      <div
        className="font-roboto text-2xl font-medium text-neutral-800 dark:text-neutral-200"
        style={{ textShadow: "0 0 5px rgba(255, 255, 255, 0.7)" }}
      >
        {date}
      </div>
    </div>
  );
}

export default DateComponent;
