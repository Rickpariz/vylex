import { injectable } from "inversify";
import {
  IWatchedMovieRepository,
  UserMovie,
} from "./interfaces/watched-movie-repository.interface";
import { WatchedMovieSchema } from "../entities/movie.schema";
import { WatchedMovie } from "../entities/movie.entity";
import { Model, model } from "mongoose";
import { connectDatabase } from "../../../../shared/database/mongodb";
import { Report } from "../../../users/entities/report.entity";
import { GetUsersMoviesReportAggregation } from "./aggregations/get-users-movies-report";

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

  async exists(params: UserMovie): Promise<boolean> {
    await this.connect();
    const { userId, movieId } = params;

    const watchedMovie = await this.collection.countDocuments({
      userId,
      "movie.id": movieId,
    });
    return Boolean(watchedMovie > 0);
  }

  async remove(params: UserMovie): Promise<void> {
    await this.connect();
    const { userId, movieId } = params;

    await this.collection.deleteOne({
      userId,
      "movie.id": movieId,
    });
  }

  async findByUserId(userId: number): Promise<WatchedMovie[]> {
    await this.connect();

    return await this.collection
      .find({
        userId,
      })
      .lean();
  }

  async report(): Promise<Report[]> {
    const report = await this.collection
      .aggregate(GetUsersMoviesReportAggregation as any)
      .exec();
    return report || [];
  }
}
