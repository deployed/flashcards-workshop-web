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
