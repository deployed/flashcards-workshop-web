import { createFileRoute, Link } from '@tanstack/react-router';

import { WaveBackground } from '@/components/backgrounds/WaveBackground';
import { Button } from '@/components/base/Button';
import { Text } from '@/components/base/Text';
import { Logo } from '@/components/brand/Logo';
import { CreateFlashcardSet } from '@/components/flashcard-sets/CreateFlashcardSet';

export const Route = createFileRoute('/')({
  component: HomeRoute,
});

function HomeRoute() {
  return (
    <>
      <WaveBackground variant="home" />
      <main className="mx-content my-15 flex h-full flex-col items-center justify-between laptop:justify-start">
        <Logo />
        <div className="mx-12 my-20 flex flex-col gap-16 laptop:my-44 laptop:gap-28">
          <div className="flex flex-col items-center gap-content">
            <Text>Stwórz swój zestaw fiszek od zera</Text>
            <CreateFlashcardSet>
              <Button>Zacznij Tutaj</Button>
            </CreateFlashcardSet>
          </div>
          <div className="flex flex-col items-center gap-content">
            <Text className="text-center">
              Mając już stworzone fiszki, podejmij wyzwanie i sprawdź czego się nauczyłeś
            </Text>
            <Button asChild>
              <Link to="/sets">Sprawdź się</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
