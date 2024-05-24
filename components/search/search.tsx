'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDebounce } from 'use-debounce';
import { usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

export function SearchInput({ search }: { search?: string }) {
  const router = useRouter();
  const path = usePathname();
  const initialRender = useRef(true);
  const pathname = path;
  const [text, setText] = useState(search);
  const [query] = useDebounce(text, 750);

  useEffect(() => {
    if (!initialRender.current) {
      if (!query && !search) {
        return;
      }

      if (!query) {
        router.push(`${pathname}`);
      } else {
        router.push(`${pathname}?search=${query}`);
      }
    } else {
      initialRender.current = false;
    }
  }, [query, pathname, router, search]);
  return (
    <>
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="search"
        placeholder="Search..."
        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
      />
    </>
  );
}
