import { injectable } from "inversify";
import { GenreApiResponse, GenreExternal } from "../../entities/genre.entity";
import { IExternal } from "../../../../shared/external";
import { TheMovieApi } from "../../../../shared/api/the-movie.api";
import { BadRequest } from "../../../../shared/http";
import { axiosError } from "../../../../shared/errors/axios-error";
import logger from "../../../../shared/logger";

@injectable()
export default class GetGenresExternal
  implements IExternal<void, GenreExternal[]>
{
  async call(): Promise<GenreExternal[]> {
    try {
      const { data } = await TheMovieApi.get<GenreApiResponse>(
        "/genre/movie/list?language=en"
      );

      return data.genres;
    } catch (error) {
      axiosError(error);
      throw BadRequest("Error on get genres");
    }
  }
}
