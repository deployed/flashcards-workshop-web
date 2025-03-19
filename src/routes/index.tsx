import { createFileRoute } from '@tanstack/react-router';

import { WaveBackground } from '@/components/backgrounds/WaveBackground';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <main>
      <WaveBackground variant="top" />
    </main>
  );
}
