export type BackendFlashcardSet = {
  id: number;
  title: string;
  description: string;
  is_active: boolean;
};

export type FlashcardSet = Omit<BackendFlashcardSet, 'is_active'> & {
  isActive: boolean;
};

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
  flashcard_set: string;
};
