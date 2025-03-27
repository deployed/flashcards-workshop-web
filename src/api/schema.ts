export type BackendFlashcardSet = {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
  flashcardCount: number;
};

export type FlashcardSet = BackendFlashcardSet;

export type CreateFlashcardSetPayload = {
  title: string;
};

export type BackendFlashcard = {
  id: number;
  question: string;
  answer: string;
};

export type Flashcard = BackendFlashcard;

export type CreateFlashcardPayload = {
  question: string;
  answer: string;
  // TODO: This should be removed from backend as it is in the URL
  flashcardSet: string;
};

export type FlashcardSetCounters = {
  known: number;
  unknown: number;
};
