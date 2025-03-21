import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

import { Button, type ButtonProps } from '@/components/base/Button';
import { useIsBreakpoint } from '@/lib/styling';

export type ChevronProps = ButtonProps & {
  direction: 'left' | 'right';
};

export function Chevron({ direction, ...rest }: ChevronProps) {
  const isLaptop = useIsBreakpoint('laptop');

  return (
    <Button variant="outlined" size="icon" {...rest}>
      {direction === 'left' ? (
        <ChevronLeftIcon width={isLaptop ? 24 : 16} height={isLaptop ? 24 : 16} />
      ) : (
        <ChevronRightIcon width={isLaptop ? 24 : 16} height={isLaptop ? 24 : 16} />
      )}
    </Button>
  );
}
