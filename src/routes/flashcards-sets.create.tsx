import { createFileRoute } from '@tanstack/react-router';

import { BackButton } from '@/components/BackButton';
import { Button } from '@/components/Button';
import { Flashcard } from '@/components/Flashcard';
import { Text } from '@/components/Text';
import { WaveBackground } from '@/components/backgrounds/WaveBackground';

export const Route = createFileRoute('/flashcards-sets/create')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <WaveBackground variant="bottom" />
      <main className="flex h-full flex-col items-center gap-20 py-15">
        <div className="flex flex-col items-center gap-content">
          <Text>Fiszka</Text>
          <Text variant="emphasis">1</Text>
          <Text>Wpisz obydwie karteczki</Text>
        </div>
        <div className="flex flex-col items-center gap-content">
          <Flashcard type="front" />
          <Flashcard type="back" />
        </div>
        <div className="flex flex-col gap-content">
          <Button>Kontynuuj</Button>
          <BackButton />
        </div>
      </main>
    </>
  );
}
