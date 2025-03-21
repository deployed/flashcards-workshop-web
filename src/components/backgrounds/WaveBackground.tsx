import type { FC } from 'react';

import { useIsBreakpoint } from '@/lib/styling';

import { DesktopBottomWave } from './desktop/DesktopBottomWave';
import { DesktopTopWave } from './desktop/DesktopTopWave';
import { MobileBottomWave } from './mobile/MobileBottomWave';
import { MobileHomeWave } from './mobile/MobileHomeWave';
import { MobileTopWave } from './mobile/MobileTopWave';

export type WaveVariant = 'top' | 'bottom' | 'home';

const MOBILE_WAVE_COMPONENTS = {
  top: MobileTopWave,
  bottom: MobileBottomWave,
  home: MobileHomeWave,
} as const satisfies Record<WaveVariant, FC>;

const DESKTOP_WAVE_COMPONENTS = {
  top: DesktopTopWave,
  bottom: DesktopBottomWave,
  home: DesktopTopWave,
} as const satisfies Record<WaveVariant, FC>;

export type WaveBackgroundProps = {
  variant: WaveVariant;
};

export function WaveBackground({ variant }: WaveBackgroundProps) {
  const isMobile = !useIsBreakpoint('laptop');

  if (isMobile) {
    const Component = MOBILE_WAVE_COMPONENTS[variant];
    return <Component />;
  }

  const Component = DESKTOP_WAVE_COMPONENTS[variant];
  return <Component />;
}
