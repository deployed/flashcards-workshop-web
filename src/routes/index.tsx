import { createFileRoute } from '@tanstack/react-router';

import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { WaveBackground } from '@/components/backgrounds/WaveBackground';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <>
      <WaveBackground variant="top" />
      <main className="my-15 mx-auto">
        <Logo />
        <Button>Click me</Button>
      </main>
    </>
  );
}
