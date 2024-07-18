import { Schema } from "mongoose";
import { Genre } from "./genre.entity";

export const GenreSchema = new Schema<Genre>(
  {
    name: { type: String, required: true },
    externalId: { type: Number, required: true },
  },
  { timestamps: true }
);
