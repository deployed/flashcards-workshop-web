import { createQueryKeyStore } from '@lukemorales/query-key-factory';

export const queryKeys = createQueryKeyStore({
  flashcardsSets: {
    list: () => ['flashcards-sets'],
  },
});
