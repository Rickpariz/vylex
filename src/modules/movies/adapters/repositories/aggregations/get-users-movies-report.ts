const GroupUsers = {
  $group: {
    _id: "$userId",
    totalFilmsWatched: {
      $sum: 1,
    },
    genres: {
      $push: "$movie.genres",
    },
    lastFilm: {
      $last: "$movie",
    },
  },
};

const UnwindGenres = {
  $unwind: "$genres",
};

const GroupGenresByUserAndCount = {
  $group: {
    _id: {
      userId: "$_id",
      genre: "$genres",
    },
    genreCount: {
      $sum: 1,
    },
    totalFilmsWatched: {
      $first: "$totalFilmsWatched",
    },
    lastFilm: {
      $first: "$lastFilm",
    },
  },
};

const OrderByGenreCount = {
  $sort: {
    genreCount: -1,
  },
};

const GetMostWatchedGenre = {
  $group: {
    _id: "$_id.userId",
    totalFilmsWatched: {
      $first: "$totalFilmsWatched",
    },
    mostWatchedThemeId: {
      $first: "$_id.genre",
    },
    mostWatchedThemeCount: {
      $first: "$genreCount",
    },
    lastFilm: {
      $first: "$lastFilm",
    },
  },
};

const PopulateGenre = {
  $lookup: {
    from: "genres",
    localField: "mostWatchedThemeId",
    foreignField: "externalId",
    as: "genre",
  },
};

const UnwindGenreDetails = { $unwind: "$genre" };

const ProjectReport = {
  $project: {
    _id: 0,
    userId: "$_id",
    totalFilmsWatched: 1,
    mostWatchedTheme: {
      themeId: "$genreDetails.externalId",
      totalFilmsWatched: "$mostWatchedThemeCount",
      themeName: "$genreDetails.name",
    },
    lastFilmWatched: {
      movieId: "$lastFilm.id",
      movieName: "$lastFilm.title",
    },
  },
};

export const GetUsersMoviesReportAggregation = [
  // Grouping users, count movies watched by user
  // Grouping genres and get last movie watched
  GroupUsers,
  // Flatting genres to root level
  UnwindGenres,
  UnwindGenres,
  // Grouping genres by user and count ocurrences
  GroupGenresByUserAndCount,
  // Sort by genre count
  OrderByGenreCount,
  // Grouping by user and get most watched genre
  GetMostWatchedGenre,
  // Populate genre details
  PopulateGenre,
  // Unwind genre details to create one object
  UnwindGenreDetails,
  // Project report to return
  ProjectReport,
];
