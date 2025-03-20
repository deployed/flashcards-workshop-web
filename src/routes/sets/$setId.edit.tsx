import { createFileRoute } from '@tanstack/react-router';

import { BackButton } from '@/components/BackButton';
import { Button } from '@/components/Button';
import { Flashcard } from '@/components/Flashcard';
import { Page } from '@/components/Page';
import { Text } from '@/components/Text';
import { WaveBackground } from '@/components/backgrounds/WaveBackground';

export const Route = createFileRoute('/sets/$setId/edit')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <WaveBackground variant="bottom" />
      <Page>
        <div className="flex flex-col items-center gap-content">
          <Text>Fiszka</Text>
          <Text variant="emphasis">1</Text>
          <Text>Wpisz obydwie karteczki</Text>
        </div>
        <div className="flex flex-col items-center gap-content">
          <Flashcard type="front" />
          <Flashcard type="back" />
        </div>
        <div className="mt-auto flex flex-col gap-content">
          <Button>Kontynuuj</Button>
          <BackButton />
        </div>
      </Page>
    </>
  );
}
