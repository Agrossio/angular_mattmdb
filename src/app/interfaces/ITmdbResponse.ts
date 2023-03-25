import {Media} from "../models/Media";

export interface ITmdbResponse {


  page: number;
  results: Array<Media>;
  total_pages: number;
  total_results: number;

  /*  constructor(page: number, results: Array<Media>, total_pages: number, total_results: number) {
      this.page = page;
      this.results = results;
      this.total_pages = total_pages;
      this.total_results = total_results;
    }*/
}
