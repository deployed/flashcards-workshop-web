import { useEffect, useState } from 'react';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function getBreakpointValue(breakpoint: string): string {
  if (typeof window !== 'undefined') {
    return getComputedStyle(document.documentElement).getPropertyValue(breakpoint).trim();
  }
  return '';
}

const breakpoints = {
  sm: '--breakpoint-sm',
  md: '--breakpoint-md',
  lg: '--breakpoint-lg',
  xl: '--breakpoint-xl',
  '2xl': '--breakpoint-2xl',
  tablet: '--breakpoint-tablet',
  laptop: '--breakpoint-laptop',
  desktop: '--breakpoint-desktop',
} as const;

export function useIsBreakpoint(breakpoint: keyof typeof breakpoints): boolean {
  const [isBreakpoint, setIsBreakpoint] = useState(false);

  useEffect(() => {
    const breakpointValue = getBreakpointValue(breakpoints[breakpoint]);
    const mediaQueryList = window.matchMedia(`(min-width: ${breakpointValue})`);

    const listener = (event: MediaQueryListEvent) => {
      setIsBreakpoint(event.matches);
    };

    setIsBreakpoint(mediaQueryList.matches); // Initial check
    mediaQueryList.addEventListener('change', listener);

    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [breakpoint]);

  return isBreakpoint;
}
