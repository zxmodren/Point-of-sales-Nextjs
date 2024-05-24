import { TypewriterEffect } from '@/components/ui/type-writer';
import Link from 'next/link';
export default function Home() {
  const words = [
    {
      text: 'Build',
    },
    {
      text: 'awesome',
    },
    {
      text: 'apps',
    },
    {
      text: 'with',
    },
    {
      text: 'Aceternity.',
      className: 'text-blue-500 dark:text-blue-500',
    },
  ];
  return (
    <main>
      <div className="h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="flex flex-col items-center justify-center h-[40rem] ">
          <p className="text-neutral-600 dark:text-neutral-200 text-base  mb-10">
            The road to freedom starts from here
          </p>
          <TypewriterEffect words={words} />
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
            <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
              <Link href={'/home'}>
                <span>Home</span>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
