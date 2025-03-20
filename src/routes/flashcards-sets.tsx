import { createFileRoute, Link } from '@tanstack/react-router';

import { loadFlashcardSets, useFlashcardSetsQuery } from '@/api/query/flashcards-sets-query';
import { Button } from '@/components/Button';
import { Logo } from '@/components/Logo';
import { ScrollArea } from '@/components/ScrollArea';
import { Text } from '@/components/Text';
import { WaveBackground } from '@/components/backgrounds/WaveBackground';

export const Route = createFileRoute('/flashcards-sets')({
  component: RouteComponent,
  loader: ({ context: { queryClient } }) => loadFlashcardSets(queryClient),
});

function RouteComponent() {
  const { data } = useFlashcardSetsQuery();

  return (
    <>
      <WaveBackground variant="bottom" />
      <main className="relative flex h-full flex-col items-center justify-between py-15">
        <div className="flex flex-col items-center gap-content">
          <Logo />
          <Text className="max-w-[200px] text-center laptop:max-w-full">
            Wybierz zestaw fiszek do nauki i sprawdź się
          </Text>
        </div>
        <div className="flex min-h-0 grow flex-col items-center justify-end">
          <div className="flex min-h-0 grow flex-col justify-end gap-content">
            <ScrollArea scrollbarAlwaysVisible className="min-h[400px] h-3/4">
              <div className="flex flex-col gap-content px-4">
                {data.map(({ id, title }) => (
                  <Button className="laptop:w-[30vw]" key={id}>
                    {title}
                  </Button>
                ))}
              </div>
            </ScrollArea>
            <Text variant="emphasis" className="text-center" asChild>
              <Link to="/">Lub stwórz nowe fiszki</Link>
            </Text>
          </div>
          <span className="flex justify-center">
            <Button className="mt-20" asChild>
              <Link to="/">Powrót</Link>
            </Button>
          </span>
        </div>
      </main>
    </>
  );
}
