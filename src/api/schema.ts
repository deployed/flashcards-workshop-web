export type BackendFlashCardSet = {
  id: number;
  title: string;
  description: string;
  is_active: boolean;
};

export type FlashCardSet = Omit<BackendFlashCardSet, 'is_active'> & {
  isActive: boolean;
};
