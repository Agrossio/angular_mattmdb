export class Video {

  id?: string;
  iso_639_1?: string;
  iso_3166_1?: string;
  key: string;
  name: string;
  official?: boolean;
  published_at?: string;
  site?: string;
  size?: number;
  type?: string;

  constructor(id: string, iso_639_1: string, iso_3166_1: string, key: string, name: string, official: boolean, published_at: string, site: string, size: number, type: string) {
    this.id = id;
    this.iso_639_1 = iso_639_1;
    this.iso_3166_1 = iso_3166_1;
    this.key = key;
    this.name = name;
    this.official = official;
    this.published_at = published_at;
    this.site = site;
    this.size = size;
    this.type = type;
  }
}
