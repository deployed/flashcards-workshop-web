import { useState } from 'react';

import { createFileRoute, Link } from '@tanstack/react-router';
import { zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';

import { useApiClient } from '@/api/apiClient';
import { markFlashcardAsLearned, markFlashcardAsUnknown } from '@/api/mutations/flashcards';
import { flashcardLearnSetQuery } from '@/api/query/flashcards';
import { WaveBackground } from '@/components/backgrounds/WaveBackground';
import { Button } from '@/components/base/Button';
import { Page } from '@/components/base/Page';
import { Text } from '@/components/base/Text';
import { Flashcard } from '@/components/flashcards/Flashcard';
import { BackButton } from '@/components/navigation/BackButton';
import { cn } from '@/lib/styling';

const learnSearchParams = z.object({
  username: z.string(),
});

export const Route = createFileRoute('/sets/$setId/learn')({
  component: LearnFlashcards,
  validateSearch: zodValidator(learnSearchParams),
  loaderDeps: ({ search: { username } }) => ({
    username,
  }),
  loader: ({ context: { apiClient }, params: { setId }, deps: { username } }) =>
    flashcardLearnSetQuery({ client: apiClient, setId, username }),
});

function LearnFlashcards() {
  const client = useApiClient();
  const flashcards = Route.useLoaderData();
  const { setId } = Route.useParams();
  const { username } = Route.useSearch();
  const [shownFace, setShownFace] = useState<'front' | 'back'>('front');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [knownCount, setKnownCount] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const currentFlashcard = flashcards[currentIndex];
  const isFinished = currentIndex >= flashcards.length;
  const toLearnCount = flashcards.length - knownCount;

  const handleAnswer = (answer: 'known' | 'unknown') => {
    const flashcardId = currentFlashcard.id;
    if (answer === 'known') {
      setKnownCount(knownCount + 1);
      void markFlashcardAsLearned({ client, flashcardId: flashcardId.toString(), username, setId });
    }
    void markFlashcardAsUnknown({ client, flashcardId: flashcardId.toString(), username, setId });
    setCurrentIndex(currentIndex + 1);
    setIsAnimating(false);
    setShownFace('front');
  };

  const handleCardClick = () => {
    setIsAnimating(true);
    setShownFace(shownFace === 'front' ? 'back' : 'front');
  };

  if (isFinished) {
    return (
      <>
        <WaveBackground variant="top" />
        <Page className="justify-between">
          <div className="flex flex-col items-center gap-content">
            <Text className="text-3xl">Podsumowanie</Text>
          </div>
          <div className="flex flex-col gap-content">
            <div className="flex flex-col gap-content">
              <Text variant="emphasis">Umiem</Text>
              <Text>
                {knownCount} z {flashcards.length}
              </Text>
            </div>
            <div className="flex flex-col gap-content">
              <Text variant="emphasis">Tyle jeszcze musze powtórzyć</Text>
              {toLearnCount > 0 ? (
                <Text>
                  {toLearnCount} z {flashcards.length - knownCount}
                </Text>
              ) : (
                <Text>Wszystko umiem</Text>
              )}
            </div>
          </div>

          <Button asChild>
            <Link to="/sets" replace>
              Zakończ
            </Link>
          </Button>
        </Page>
      </>
    );
  }

  return (
    <>
      <WaveBackground variant="bottom" />
      <Page>
        <div className="flex flex-col items-center gap-content">
          <Text>Fiszka</Text>
          <Text variant="emphasis">
            {currentIndex + 1} z {flashcards.length}
          </Text>
        </div>
        <div className="my-auto perspective-[1000px]">
          <div
            className={cn(
              'relative [transform-style:preserve-3d]',
              shownFace === 'back' && '[transform:rotateY(180deg)]',
              isAnimating && 'transition-transform duration-700',
            )}
          >
            <div className="backface-hidden">
              <Flashcard type="front" value={currentFlashcard.question} onClick={handleCardClick} />
            </div>
            <div className="absolute inset-0 [transform:rotateY(180deg)] backface-hidden">
              <Flashcard type="back" value={currentFlashcard.answer} onClick={handleCardClick} />
            </div>
          </div>
        </div>
        <div
          className={cn('invisible mb-5 flex flex-row gap-content', {
            visible: shownFace === 'back',
          })}
        >
          <Button onClick={() => handleAnswer('known')}>Znam</Button>
          <Button onClick={() => handleAnswer('unknown')}>Nie znam</Button>
        </div>
        <BackButton />
      </Page>
    </>
  );
}
