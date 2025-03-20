export const Endpoints = {
  flashcards: {
    list: () => '/flash-card-sets/',
    create: () => '/flash-card-sets/',
    details: (id: string) => `/flash-card-sets/${id}/`,
  },
};
