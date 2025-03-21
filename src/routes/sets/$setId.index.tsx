import { createFileRoute, Link } from '@tanstack/react-router';

import {
  loadFlashcardSetDetails,
  useFlashcardSetDetails,
} from '@/api/query/hooks/useFlashcardSets';
import { WaveBackground } from '@/components/backgrounds/WaveBackground';
import { Button } from '@/components/base/Button';
import { Page, PageContent } from '@/components/base/Page';
import { LogoWithText } from '@/components/brand/Logo';
import { BackButton } from '@/components/navigation/BackButton';

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
