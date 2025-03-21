import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';

import { useDeleteFlashcardSet } from '@/api/mutations/hooks/useFlashcardSetsMutation';
import {
  loadFlashcardSetDetails,
  useFlashcardSetDetails,
} from '@/api/query/hooks/useFlashcardSets';
import { WaveBackground } from '@/components/backgrounds/WaveBackground';
import { Button } from '@/components/base/Button';
import { Page, PageContent } from '@/components/base/Page';
import { LogoWithText } from '@/components/brand/Logo';
import { ConfirmFlashcardSetDeletion } from '@/components/flashcard-sets/ConfirmFlashcardSetDeletion';
import { BackButton } from '@/components/navigation/BackButton';

export const Route = createFileRoute('/sets/$setId/')({
  component: SetDetailsRoute,
  loader: ({ context, params }) => loadFlashcardSetDetails({ ...context, id: params.setId }),
});

function SetDetailsRoute() {
  const navigate = useNavigate();
  const { setId } = Route.useParams();
  const { data: flashcardSet } = useFlashcardSetDetails({ id: setId });
  const { mutateAsync: deleteFlashcardSet } = useDeleteFlashcardSet();

  const handleFlashcardSetDeletion = async () => {
    navigate({ to: '/sets', replace: true });
    await deleteFlashcardSet({ id: setId });
  };

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
            <ConfirmFlashcardSetDeletion onConfirm={handleFlashcardSetDeletion}>
              <Button size="large">Usuń zestaw</Button>
            </ConfirmFlashcardSetDeletion>
          </div>
          <BackButton />
        </PageContent>
      </Page>
    </>
  );
}
