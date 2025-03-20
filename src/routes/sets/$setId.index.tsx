import { createFileRoute, Link } from '@tanstack/react-router';

import { loadFlashcardSetDetails, useFlashcardSetDetails } from '@/api/query/flashcards-sets-query';
import { BackButton } from '@/components/BackButton';
import { Button } from '@/components/Button';
import { LogoWithText } from '@/components/LogoWithText';
import { Page, PageContent } from '@/components/Page';
import { WaveBackground } from '@/components/backgrounds/WaveBackground';

export const Route = createFileRoute('/sets/$setId/')({
  component: SetDetailsRoute,
  loader: ({ context, params }) => loadFlashcardSetDetails({ ...context, id: params.setId }),
});

function SetDetailsRoute() {
  const { setId } = Route.useParams();
  const { data: flashcardSet } = useFlashcardSetDetails({ id: setId });

  return (
    <>
      <WaveBackground variant="bottom" />
      <Page>
        <LogoWithText>{flashcardSet.title}</LogoWithText>
        <PageContent>
          <div className="flex flex-col gap-content">
            <Button size="large">Sprawdź się</Button>
            <Button size="large" asChild>
              <Link to="/sets/$setId/edit" params={{ setId }}>
                Edytuj Zestaw
              </Link>
            </Button>
            <Button size="large">Usuń zestaw</Button>
          </div>
          <BackButton />
        </PageContent>
      </Page>
    </>
  );
}
