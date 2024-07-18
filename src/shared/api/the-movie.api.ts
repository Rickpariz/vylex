import axios from "axios";

export const TheMovieApi = axios.create({
  baseURL: process.env.THE_MOVIE_API_URL,
  params: {
    api_key: process.env.THE_MOVIE_API_KEY,
  },
});
