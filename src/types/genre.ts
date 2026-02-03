export interface Genres {
  id: number;
  name: string;
}

export interface GenresResponse {
  genres: Genres[];
}