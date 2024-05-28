'use client'; // Use client-side rendering

import { useEffect, useRef, useState } from 'react'; // Import necessary hooks from React
import { useRouter } from 'next/navigation'; // Import the useRouter hook from Next.js for routing
import { useDebounce } from 'use-debounce'; // Import the useDebounce hook for debouncing
import { usePathname } from 'next/navigation'; // Import the usePathname hook from Next.js for getting the current pathname
import { Input } from '@/components/ui/input'; // Import the Input component
import { Search } from 'lucide-react'; // Import the Search icon component from Lucide React

export function SearchInput({ search }: { search?: string }) {
  const router = useRouter(); // Get the router object
  const path = usePathname(); // Get the current pathname using the usePathname hook
  const initialRender = useRef(true); // Use a ref to track the initial render
  const pathname = path; // Set the pathname variable to the current pathname
  const [text, setText] = useState(search); // Use state to manage the search text
  const [query] = useDebounce(text, 750); // Use the useDebounce hook to debounce the search text

  useEffect(() => {
    if (!initialRender.current) {
      // Check if it's not the initial render
      if (!query && !search) {
        // If the query and search are both empty, return
        return;
      }

      if (!query) {
        // If the query is empty, navigate to the current pathname
        router.push(`${pathname}`);
      } else {
        // If the query is not empty, navigate to the current pathname with the search query
        router.push(`${pathname}?search=${query}`);
      }
    } else {
      // If it's the initial render, set initialRender to false
      initialRender.current = false;
    }
  }, [query, pathname, router, search]); // Run the effect when query, pathname, router, or search changes

  return (
    <>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />{' '}
      {/* Render the Search icon */}
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]" // Render the Input component with specific styles
      />
    </>
  );
}
