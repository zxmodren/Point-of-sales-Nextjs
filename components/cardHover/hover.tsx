import { HoverEffect } from '../ui/card-hover-effect';
import { Card } from '@/components/ui/card';
export function CardHoverEffectDemo() {
  return (
    <Card className="h-full w-full">
      <HoverEffect items={projects} />
    </Card>
  );
}
export const projects = [
  {
    title: 'Aceternity UI',
    description: 'Make your websites look 10x modern.',
    link: 'https://ui.aceternity.com',
  },
  {
    title: 'Shadcn/ui',
    description:
      'Beautifully designed components that you can copy and paste into your apps. Accessible. Customizable. Open Source.',
    link: 'https://ui.shadcn.com',
  },
  {
    title: 'Next.js',
    description: 'The React Framework for the Web.',
    link: 'https://nextjs.org',
  },
  {
    title: 'Prisma',
    description: 'Build data-driven applications — with a great DX.',
    link: 'https://www.prisma.io',
  },
  {
    title: 'Amazon',
    description:
      'A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
    link: 'https://amazon.com',
  },
  {
    title: 'Vercel',
    description:
      'Vercel is the Frontend Cloud. Build, scale, and secure a faster, personalized web.',
    link: 'https://vercel.com',
  },
];
