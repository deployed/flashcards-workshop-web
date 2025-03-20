import { createFileRoute, Link } from '@tanstack/react-router';

import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { Text } from '@/components/Text';
import { WaveBackground } from '@/components/backgrounds/WaveBackground';
import { EnterFlashcardSetName } from '@/components/flashcard-sets/EnterFlashcardSetName';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <>
      <WaveBackground variant="home" />
      <main className="mx-content my-15 flex h-full flex-col items-center justify-between laptop:justify-start">
        <Logo />
        <div className="mx-12 my-20 flex flex-col gap-16 laptop:my-44 laptop:gap-28">
          <div className="flex flex-col items-center gap-content">
            <Text>Stwórz swój zestaw fiszek od zera</Text>
            <EnterFlashcardSetName onSetName={(name) => console.log(name)}>
              <Button>Zacznij Tutaj</Button>
            </EnterFlashcardSetName>
          </div>
          <div className="flex flex-col items-center gap-content">
            <Text className="text-center">
              Mając już stworzone fiszki, podejmij wyzwanie i sprawdź czego się nauczyłeś
            </Text>
            <Button asChild>
              <Link to="/flashcards-sets">Sprawdź się</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
