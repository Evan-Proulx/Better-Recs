import {Artist} from "./artist";

export class Album {
  id: string;
  name: string;
  releaseDate: string;
  totalTracks: number;
  href: string;
  uri: string;
  images: { url: string }[];
  externalUrl: string;
  artists: Artist[];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.releaseDate = data.release_date;
    this.totalTracks = data.total_tracks;
    this.href = data.href;
    this.uri = data.uri;
    this.images = data.images;
    this.externalUrl = data.external_urls?.spotify;
    this.artists = data.artists.map((artist: any) => new Artist(artist));
  }
}
