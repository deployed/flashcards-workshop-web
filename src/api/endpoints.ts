export const Endpoints = {
  flashcardSets: {
    list: () => '/flash-card-sets/',
    create: () => '/flash-card-sets/',
    details: (id: string) => `/flash-card-sets/${id}/`,
    delete: (id: string) => `/flash-card-sets/${id}/`,
  },
};
