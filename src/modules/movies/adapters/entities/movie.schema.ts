import { Schema } from "mongoose";
import { WatchedMovie } from "./movie.entity";

export const WatchedMovieSchema = new Schema<WatchedMovie>(
  {
    movie: {
      id: { type: Number, required: true },
      title: { type: String, required: true },
      genres: [{ type: Number }],
    },
    userId: { type: Number, required: true },
  },
  { timestamps: true }
);
