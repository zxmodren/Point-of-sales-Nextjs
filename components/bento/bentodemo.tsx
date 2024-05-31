/* eslint-disable react/no-unescaped-entities */
'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import { BentoGrid, BentoGridItem } from '../ui/bento-grid';
import {
  IconWifi,
  IconClock,
  IconCloud,
  IconCalendarMonth,
  IconTableColumn,
} from '@tabler/icons-react';
import DigitalClock from '../clock/clock';
import DateComponent from '../date/date';
import WeatherComponent from '../weather/weather';
import DashboardCard from '../card/card';
import NetworkSpeed from '../networkspeed/networkspeed';
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
    title: 'Network Speed',
    description: (
      <span className="text-sm">
        Summarize your lengthy documents with AI technology.
      </span>
    ),
    header: <NetworkSpeed />,
    className: 'md:col-span-1',
    icon: <IconWifi className="h-4 w-4 text-neutral-500" />,
  },
];
