export const Endpoints = {
  flashcardSets: {
    list: () => '/flash-card-sets/',
    create: () => '/flash-card-sets/',
    details: (id: string) => `/flash-card-sets/${id}/`,
    delete: (id: string) => `/flash-card-sets/${id}/`,
    for: (id: string) => ({
      flashcards: {
        list: () => `/flash-card-sets/${id}/flash-cards/`,
        create: () => `/flash-card-sets/${id}/flash-cards/`,
        details: (flashcardId: string) => `/flash-card-sets/${id}/flash-cards/${flashcardId}/`,
        delete: (flashcardId: string) => `/flash-card-sets/${id}/flash-cards/${flashcardId}/`,
        update: (flashcardId: string) => `/flash-card-sets/${id}/flash-cards/${flashcardId}/`,
      },
    }),
  },
};
