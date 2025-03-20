import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';

import { useCreateFlashcardSet } from '@/api/mutations/flashcards-sets-mutation';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { Text } from '@/components/Text';
import { WaveBackground } from '@/components/backgrounds/WaveBackground';
import { EnterFlashcardSetName } from '@/components/flashcard-sets/EnterFlashcardSetName';

export const Route = createFileRoute('/')({
  component: HomeRoute,
});

function HomeRoute() {
  const { mutateAsync: createFlashcardSet } = useCreateFlashcardSet();
  const navigate = useNavigate({ from: '/' });

  const handleSetCreation = async (name: string) => {
    const { id } = await createFlashcardSet({ title: name });
    await navigate({ to: `/sets/$setId`, params: { setId: id.toString() } });
  };

  return (
    <>
      <WaveBackground variant="home" />
      <main className="mx-content my-15 flex h-full flex-col items-center justify-between laptop:justify-start">
        <Logo />
        <div className="mx-12 my-20 flex flex-col gap-16 laptop:my-44 laptop:gap-28">
          <div className="flex flex-col items-center gap-content">
            <Text>Stwórz swój zestaw fiszek od zera</Text>
            <EnterFlashcardSetName onSetName={handleSetCreation}>
              <Button>Zacznij Tutaj</Button>
            </EnterFlashcardSetName>
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
