import { injectable } from "inversify";
import { IExternal } from "../../../../shared/external";
import { TheMovieApi } from "../../../../shared/api/the-movie.api";
import { BadRequest } from "../../../../shared/http";
import { axiosError } from "../../../../shared/errors/axios-error";
import {
  GetMovieExternalParams,
  GetMoviesApiResponse,
} from "./types/get-movies-external.type";

@injectable()
export default class GetMoviesExternal
  implements IExternal<GetMovieExternalParams, GetMoviesApiResponse>
{
  async call(params: GetMovieExternalParams): Promise<GetMoviesApiResponse> {
    try {
      const { page = 1, genres } = params;

      const { data } = await TheMovieApi.get<GetMoviesApiResponse>(
        "/discover/movie",
        {
          params: {
            page,
            with_genres: genres.join(" | "),
          },
        }
      );

      return data;
    } catch (error) {
      axiosError(error);
      throw BadRequest("Error on get movies");
    }
  }
}
