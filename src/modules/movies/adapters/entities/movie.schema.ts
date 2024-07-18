import { Schema } from "mongoose";
import { Movie } from "./movie.entity";

export const MovieSchema = new Schema<Movie>(
  {
    title: { type: String, required: true },
    externalId: { type: Number, required: true },
    genres: [{ type: Number }],
  },
  { timestamps: true }
);
