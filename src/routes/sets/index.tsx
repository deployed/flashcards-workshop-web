import { createFileRoute, Link } from '@tanstack/react-router';

import { loadFlashcardSets, useFlashcardSetsQuery } from '@/api/query/flashcards-sets-query';
import { BackButton } from '@/components/BackButton';
import { Button } from '@/components/Button';
import { LogoWithText } from '@/components/LogoWithText';
import { Page, PageContent } from '@/components/Page';
import { ScrollArea } from '@/components/ScrollArea';
import { Text } from '@/components/Text';
import { WaveBackground } from '@/components/backgrounds/WaveBackground';

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
            <Text variant="emphasis" className="text-center" asChild>
              <Link to="/">Lub stwórz nowe fiszki</Link>
            </Text>
          </div>

          <BackButton />
        </PageContent>
      </Page>
    </>
  );
}
