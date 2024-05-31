import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
const Page = () => {
  return (
    <div className="w-full h-full dark:bg-[#0F0F0F] flex flex-col items-center p-4">
      <div className="flex flex-col lg:flex-row justify-center items-center w-full h-full gap-4">
        <Card className="w-full lg:w-1/2 h-full flex flex-col">
          <CardHeader>
            <CardTitle>Total Products Sale</CardTitle>
            <CardDescription>
              Explore insights and analytics about our total product sales.
              Click the button below to view detailed product analytics.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow pt-5">
            <div className="p-4">
              <svg viewBox="0 0 100 50" className="w-full h-auto">
                {/* X and Y axes */}
                <line
                  x1="0"
                  y1="45"
                  x2="100"
                  y2="45"
                  stroke="black"
                  strokeWidth="0.5"
                />
                <line
                  x1="5"
                  y1="0"
                  x2="5"
                  y2="50"
                  stroke="black"
                  strokeWidth="0.5"
                />
                {/* Data line */}
                <polyline
                  fill="none"
                  stroke="blue"
                  strokeWidth="0.5"
                  points="5,45 15,30 25,25 35,20 45,15 55,10 65,5 75,8 85,12 95,10"
                />
                {/* Data points */}
                {[
                  { cx: 5, cy: 45 },
                  { cx: 15, cy: 30 },
                  { cx: 25, cy: 25 },
                  { cx: 35, cy: 20 },
                  { cx: 45, cy: 15 },
                  { cx: 55, cy: 10 },
                  { cx: 65, cy: 5 },
                  { cx: 75, cy: 8 },
                  { cx: 85, cy: 12 },
                  { cx: 95, cy: 10 },
                ].map((point, index) => (
                  <circle
                    key={index}
                    cx={point.cx}
                    cy={point.cy}
                    r="1"
                    fill="blue"
                  />
                ))}
              </svg>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href={'/analytics/product/sales'}>Go</Link>
            </Button>
          </CardFooter>
        </Card>
        <Separator orientation="vertical" className="hidden lg:block" />
        <Card className="w-full lg:w-1/2 h-full flex flex-col">
          <CardHeader>
            <CardTitle>Favorites Product</CardTitle>
            <CardDescription>
              Explore the popularity of our favorite products. Click the button
              below to view detailed analytics.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow pt-5">
            <div className="p-4">
              <svg viewBox="0 0 100 50" className="w-full h-auto">
                {/* X and Y axes */}
                <line
                  x1="0"
                  y1="45"
                  x2="100"
                  y2="45"
                  stroke="black"
                  strokeWidth="0.5"
                />
                <line
                  x1="5"
                  y1="0"
                  x2="5"
                  y2="50"
                  stroke="black"
                  strokeWidth="0.5"
                />
                {/* Data bars */}
                {[
                  { x: 10, y: 40, height: 5, color: 'blue' },
                  { x: 25, y: 35, height: 10, color: 'blue' },
                  { x: 40, y: 30, height: 15, color: 'blue' },
                  { x: 55, y: 25, height: 20, color: 'blue' },
                  { x: 70, y: 20, height: 25, color: 'blue' },
                  { x: 85, y: 15, height: 30, color: 'blue' },
                ].map((bar, index) => (
                  <rect
                    key={index}
                    x={bar.x}
                    y={50 - bar.y}
                    width="10"
                    height={bar.height}
                    fill={bar.color}
                  />
                ))}
              </svg>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href={'/analytics/product/favorites'}>Go</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Page;
