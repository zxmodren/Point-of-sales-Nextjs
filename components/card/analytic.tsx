import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

type CardProps = React.ComponentProps<typeof Card>;

export function CardDemo({ className, ...props }: CardProps) {
  return (
    <div className="flex gap-4">
      <Card className={cn('w-[380px] h-[400px]', className)} {...props}>
        <CardHeader>
          <CardTitle>Product</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4"></CardContent>
        <CardFooter>
          <Button className="w-full"></Button>
        </CardFooter>
      </Card>
      <Card className={cn('w-[380px] h-[400px]', className)} {...props}>
        <CardHeader>
          <CardTitle>Sale</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4"></CardContent>
        <CardFooter>
          <Button className="w-full"></Button>
        </CardFooter>
      </Card>
    </div>
  );
}
