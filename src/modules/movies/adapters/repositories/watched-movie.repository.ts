import { injectable } from "inversify";
import { IWatchedMovieRepository } from "./interfaces/watched-movie-repository.interface";
import { WatchedMovieSchema } from "../entities/movie.schema";
import { WatchedMovie } from "../entities/movie.entity";
import { Model, model } from "mongoose";
import { connectDatabase } from "../../../../shared/database/mongodb";

@injectable()
export class WatchedMovieRepository implements IWatchedMovieRepository {
  constructor() {
    this.collection = model<WatchedMovie>("watched-movies", WatchedMovieSchema);
  }
  private collection: Model<WatchedMovie>;

  private async connect() {
    await connectDatabase();
  }

  async create(data: WatchedMovie): Promise<WatchedMovie> {
    await this.connect();
    const watchedMovie = await this.collection.create(data);
    return watchedMovie;
  }
}
