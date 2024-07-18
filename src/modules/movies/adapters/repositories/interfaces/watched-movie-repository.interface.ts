import { Movie, WatchedMovie } from "../../entities/movie.entity";

export interface IWatchedMovieRepository {
  create(movie: WatchedMovie): Promise<WatchedMovie>;
}
