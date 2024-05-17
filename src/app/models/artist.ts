export class Artist {
  id: string;
  name: string;
  genres: string[];
  popularity: number;
  followers: number;
  externalUrl: string;
  images: { url: string, height: number, width: number }[];
  isFavorite: boolean = false;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.genres = data.genres;
    this.popularity = data.popularity;
    this.followers = data.followers.total;
    this.externalUrl = data.external_urls.spotify;
    this.images = data.images.map((image: any) => ({
      url: image.url,
      height: image.height,
      width: image.width,
    }));
  }
}
