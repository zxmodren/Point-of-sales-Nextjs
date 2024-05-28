'use client';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { SCROLLBAR_ITEMS } from '@/constant/chartList';
import { usePathname } from 'next/navigation';
import { LineChart } from 'lucide-react';
import Link from 'next/link';

// ScrollAreaDemo component
export function ScrollAreaDemo() {
  const pathname = usePathname();
  const [isScrollAreaVisible, setScrollAreaVisible] = React.useState(false);

  // Toggle visibility of scroll area
  const toggleScrollAreaVisibility = () => {
    setScrollAreaVisible(!isScrollAreaVisible);
  };

  return (
    <div>
      {/* Button to toggle scroll area visibility */}
      <Button
        variant="outline"
        onClick={toggleScrollAreaVisibility}
        className="w-full mt-3"
      >
        <LineChart className="mr-2 h-4 w-4" />
        {/* Toggle button text based on visibility */}
        {isScrollAreaVisible ? 'Hide Charts Menu' : 'Show Charts Menu'}
      </Button>
      {/* Render scroll area if visible */}
      {isScrollAreaVisible && (
        <ScrollArea className="h-auto rounded-md border mt-4 bg-white dark:bg-chartbody">
          <div className="p-4">
            {/* Render items in scroll area */}
            {SCROLLBAR_ITEMS.map((item) => (
              <React.Fragment key={item.path}>
                {/* Render link with styles based on current pathname */}
                <Link
                  href={item.path}
                  className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 ${
                    pathname === item.path
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:text-foreground'
                  } transition-all hover:text-primary`}
                >
                  {item.icon}
                  {item.title}
                </Link>
                <Separator className="my-2" />
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
