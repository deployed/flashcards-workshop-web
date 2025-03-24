import { createFileRoute } from '@tanstack/react-router';

import { loadFlashcards } from '@/api/query/hooks/useFlashcards';
import { WaveBackground } from '@/components/backgrounds/WaveBackground';
import { Button } from '@/components/base/Button';
import { Page } from '@/components/base/Page';
import { Text } from '@/components/base/Text';
import { Flashcard } from '@/components/flashcards/Flashcard';
import { BackButton } from '@/components/navigation/BackButton';
import { Chevron } from '@/components/navigation/Chevron';
import { useFlashcardSetEditor } from '@/lib/flashcard-sets';
import { useIsBreakpoint } from '@/lib/styling';

export const Route = createFileRoute('/sets/$setId/edit')({
  component: FlashcardSetEdit,
  loader: ({ context, params }) => loadFlashcards({ ...context, setId: params.setId }),
});

function FlashcardSetEdit() {
  const { setId } = Route.useParams();
  const editor = useFlashcardSetEditor({ id: setId });
  const isLaptop = useIsBreakpoint('laptop');

  const onFinish = () => {
    void editor.saveFlashcard();
  };

  const buttonLeft = editor.hasPreviousFlashcard ? (
    <Chevron
      direction="left"
      disabled={!editor.isValid && !editor.isPendingForCreate}
      onClick={() => {
        editor.previousFlashcard();
      }}
    />
  ) : null;
  const buttonRight = (
    <Chevron
      direction="right"
      className="ml-auto"
      disabled={!editor.isValid}
      onClick={() => {
        void editor.nextFlashcard();
      }}
    />
  );

  return (
    <>
      <WaveBackground variant="bottom" />
      <Page>
        <div className="flex flex-col items-center gap-content">
          <Text>Fiszka</Text>
          <Text variant="emphasis">
            {editor.currentIndex + 1} z {editor.flashcardCount}
          </Text>
          <Text>Wpisz obydwie karteczki</Text>
        </div>
        <div>
          <div className="flex flex-col items-center gap-content md:flex-row">
            {isLaptop && buttonLeft}
            <Flashcard
              type="front"
              value={editor.flashcardFrontValue}
              editable
              onChange={(e) => {
                editor.changeFrontValue(e.target.value);
              }}
            />
            <Flashcard
              type="back"
              value={editor.flashcardBackValue}
              editable
              onChange={(e) => {
                editor.changeBackValue(e.target.value);
              }}
            />
            {isLaptop && buttonRight}
          </div>
        </div>

        <div className="mt-auto flex w-sm flex-col gap-content px-10">
          {!isLaptop && (
            <div className="flex w-full max-w-sm flex-row">
              {buttonLeft}
              {buttonRight}
            </div>
          )}
          <Button
            variant="outlined"
            onClick={editor.deleteFlashcard}
            disabled={!editor.canDeleteFlashcard}
          >
            Usuń
          </Button>
          <BackButton onClick={onFinish}>Zakończ</BackButton>
        </div>
      </Page>
    </>
  );
}
