import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generatePagination = (
  currentPage: number,
  totalPages: number
): (number | string)[] => {
  const delta = 1;
  let pages: (number | string)[] = [];

  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    pages.push(i);
  }

  if (currentPage - delta > 2) {
    pages = [1, '...', ...pages];
  } else if (currentPage - delta === 2) {
    pages = [1, ...pages];
  }

  if (totalPages - currentPage > delta) {
    pages.push('...', totalPages);
  } else if (totalPages - currentPage === delta) {
    pages.push(totalPages);
  }

  return pages;
};
