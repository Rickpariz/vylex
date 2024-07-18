import { Pagination } from "../../../../../shared/adapters/repositories/interface";
import { Genre } from "../../../entities/genre.entity";

export interface FindParams {
  pagination: {
    pageNumber: number;
    pageSize: number;
  };
  search?: string;
}

export interface IGenresRepository {
  find(params: FindParams): Promise<Pagination<Genre>>;
  exists(): Promise<boolean>;
  createMany(genres: Genre[]): Promise<void>;
}
