import { createFileRoute, Link } from '@tanstack/react-router';

import { loadFlashcardSets, useFlashcardSetsQuery } from '@/api/query/hooks/useFlashcardSets';
import { WaveBackground } from '@/components/backgrounds/WaveBackground';
import { Button } from '@/components/base/Button';
import { Page, PageContent } from '@/components/base/Page';
import { ScrollArea } from '@/components/base/ScrollArea';
import { Text } from '@/components/base/Text';
import { LogoWithText } from '@/components/brand/Logo';
import { CreateFlashcardSet } from '@/components/flashcard-sets/CreateFlashcardSet';
import { BackButton } from '@/components/navigation/BackButton';

export const Route = createFileRoute('/sets/')({
  component: SetListRoute,
  loader: ({ context }) => loadFlashcardSets(context),
});

function SetListRoute() {
  const { data } = useFlashcardSetsQuery();

  return (
    <>
      <WaveBackground variant="bottom" />
      <Page>
        <LogoWithText>Wybierz zestaw fiszek do nauki i sprawdź się</LogoWithText>
        <PageContent className="gap-16">
          <div className="flex min-h-0 grow flex-col justify-start gap-content">
            <ScrollArea scrollbarAlwaysVisible className="h-3/4 min-h-[350px]">
              <div className="flex flex-col gap-content px-4">
                {data.map(({ id, title }) => (
                  <Button className="laptop:w-[30vw]" key={id} asChild>
                    <Link to="/sets/$setId" params={{ setId: id.toString() }}>
                      {title}
                    </Link>
                  </Button>
                ))}
              </div>
            </ScrollArea>

            <CreateFlashcardSet>
              <Text variant="emphasis" className="text-center">
                Lub stwórz nowe fiszki
              </Text>
            </CreateFlashcardSet>
          </div>
          <BackButton />
        </PageContent>
      </Page>
    </>
  );
}
