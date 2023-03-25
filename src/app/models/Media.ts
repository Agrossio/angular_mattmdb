export class Media {
  id: number;
  media_type: string;
  name: string;
  title: string;
  overview: string;
  poster_path: string;
  adult?: boolean;
  backdrop_path?: string;
  first_air_date?: string;
  release_date?: string;
  genre_ids?: Array<number>;
  origin_country?: Array<string>;
  original_language?: string;
  original_name?: string;
  popularity?: number;
  vote_average?: number;
  vote_count?: number;
  tagline?: string;

  constructor(id: number, media_type: string, name: string, title: string, overview: string, poster_path: string, adult?: boolean, backdrop_path?: string, first_air_date?: string, release_date?: string, genre_ids?: Array<number>, origin_country?: Array<string>, original_language?: string, original_name?: string, popularity?: number, vote_average?: number, vote_count?: number) {
    this.id = id;
    this.media_type = media_type;
    this.name = name;
    this.title = title;
    this.overview = overview;
    this.poster_path = poster_path;
    this.adult = adult;
    this.backdrop_path = backdrop_path;
    this.first_air_date = first_air_date;
    this.release_date = release_date;
    this.genre_ids = genre_ids;
    this.origin_country = origin_country;
    this.original_language = original_language;
    this.original_name = original_name;
    this.popularity = popularity;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
  }
}
