import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

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
import { EnterUsername } from '@/components/flashcard-sets/EnterUsername';
import { BackButton } from '@/components/navigation/BackButton';

export const Route = createFileRoute('/sets/$setId/')({
  component: SetDetailsRoute,
  loader: async ({ context, params }) => loadFlashcardSetDetails({ ...context, id: params.setId }),
});

function SetDetailsRoute() {
  const navigate = useNavigate();
  const { setId } = Route.useParams();
  const { t } = useTranslation('sets');
  const { data: flashcardSet } = useFlashcardSetDetails({ id: setId });
  const { mutateAsync: deleteFlashcardSet } = useDeleteFlashcardSet();

  const handleFlashcardSetDeletion = async () => {
    navigate({ to: '/sets', replace: true });
    await deleteFlashcardSet({ id: setId });
  };

  const handleNameChosen = (username: string) => {
    navigate({ to: '/sets/$setId/learn', params: { setId }, search: { username } });
  };

  return (
    <>
      <WaveBackground variant="bottom" />
      <Page>
        <LogoWithText>{flashcardSet.title}</LogoWithText>
        <PageContent>
          <div className="flex flex-col gap-content">
            <EnterUsername onNameChosen={handleNameChosen}>
              <Button size="large" disabled={flashcardSet.flashcardCount === 0}>
                {t('setDetails.checkYourKnowledge')}
              </Button>
            </EnterUsername>
            <Button size="large" asChild>
              <Link to="/sets/$setId/edit" params={{ setId }}>
                {t('setDetails.edit')}
              </Link>
            </Button>
            <ConfirmFlashcardSetDeletion onConfirm={handleFlashcardSetDeletion}>
              <Button size="large">{t('setDetails.delete')}</Button>
            </ConfirmFlashcardSetDeletion>
          </div>
          <BackButton />
        </PageContent>
      </Page>
    </>
  );
}
