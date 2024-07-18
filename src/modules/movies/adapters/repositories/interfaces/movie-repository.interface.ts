import { Movie } from "../../entities/movie.entity";

export interface IMovieRepository {
  create(movie: Movie): Promise<Movie>;
}
