export type Genre = {
  _id?: string;
  name: string;
  externalId: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type GenreApiResponse = {
  genres: GenreExternal[];
};

export type GenreExternal = {
  id: number;
  name: string;
};
