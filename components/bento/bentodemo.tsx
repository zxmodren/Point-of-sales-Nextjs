/* eslint-disable react/no-unescaped-entities */
'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import { BentoGrid, BentoGridItem } from '../ui/bento-grid';
import {
  IconBoxAlignRightFilled,
  IconClock,
  IconCloud,
  IconCalendarMonth,
  IconTableColumn,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import DigitalClock from '../clock/clock';
import DateComponent from '../date/date';
import WeatherComponent from '../weather/weather';
import DashboardCard from '../card/card';
export function BentoGridHome() {
  return (
    <BentoGrid className="w-full mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn('[&>p:text-lg]', item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

const SkeletonFive = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 10,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -10,
      rotate: -5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-col space-y-2"
    >
      <motion.div
        variants={variants}
        className="flex flex-row rounded-2xl border border-neutral-100 dark:border-white/[0.2] p-2  items-start space-x-2 bg-white dark:bg-black"
      >
        <Image
          src="https://pbs.twimg.com/profile_images/1417752099488636931/cs2R59eW_400x400.jpg"
          alt="avatar"
          height="100"
          width="100"
          className="rounded-full h-10 w-10"
        />
        <p className="text-xs text-neutral-500">
          There are a lot of cool framerworks out there like React, Angular,
          Vue, Svelte that can make your life ....
        </p>
      </motion.div>
      <motion.div
        variants={variantsSecond}
        className="flex flex-row rounded-full border border-neutral-100 dark:border-white/[0.2] p-2 items-center justify-end space-x-2 w-3/4 ml-auto bg-white dark:bg-black"
      >
        <p className="text-xs text-neutral-500">Use PHP.</p>
        <div className="h-6 w-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
      </motion.div>
    </motion.div>
  );
};
const items = [
  {
    title: "Don't Forget To Rest Your Soul",
    description: <span className="text-sm">Experience the power of time.</span>,
    header: <DigitalClock />,
    className: 'md:col-span-1',
    icon: <IconClock className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Human Can't Predict A Future",
    description: (
      <span className="text-sm">Don't forget bring you'r umberella.</span>
    ),
    header: <WeatherComponent />,
    className: 'md:col-span-1',
    icon: <IconCloud className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: 'Tomorrow is Tomorrow not Today',
    description: <span className="text-sm">Every Day is Amazing</span>,
    header: <DateComponent />,
    className: 'md:col-span-1',
    icon: <IconCalendarMonth className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: 'Analysis',
    description: <span className="text-sm">Understand the sale analysis.</span>,
    header: <DashboardCard />,
    className: 'md:col-span-2',
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },

  {
    title: 'Text Summarization',
    description: (
      <span className="text-sm">
        Summarize your lengthy documents with AI technology.
      </span>
    ),
    header: <SkeletonFive />,
    className: 'md:col-span-1',
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];
