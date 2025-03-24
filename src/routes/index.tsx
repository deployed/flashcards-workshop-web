import { createFileRoute, Link } from '@tanstack/react-router';
import { useTranslation } from 'react-i18next';

import { WaveBackground } from '@/components/backgrounds/WaveBackground';
import { Button } from '@/components/base/Button';
import { Text } from '@/components/base/Text';
import { Logo } from '@/components/brand/Logo';
import { CreateFlashcardSet } from '@/components/flashcard-sets/CreateFlashcardSet';

export const Route = createFileRoute('/')({
  component: HomeRoute,
});

function HomeRoute() {
  const { t } = useTranslation('home');

  return (
    <>
      <WaveBackground variant="home" />
      <main className="mx-content my-15 flex h-full flex-col items-center justify-between laptop:justify-start">
        <Logo />
        <div className="mx-12 my-20 flex flex-col gap-16 laptop:my-44 laptop:gap-28">
          <div className="flex flex-col items-center gap-content">
            <Text className="laptop:text-3xl">{t('createFlashcardSet.title')}</Text>
            <CreateFlashcardSet>
              <Button>{t('createFlashcardSet.button')}</Button>
            </CreateFlashcardSet>
          </div>
          <div className="flex flex-col items-center gap-content">
            <Text className="text-center laptop:text-3xl">{t('testYourKnowledge.title')}</Text>
            <Button asChild>
              <Link to="/sets">{t('testYourKnowledge.button')}</Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
