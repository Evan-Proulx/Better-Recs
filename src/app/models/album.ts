import {Artist} from "./artist";

export class Album {
  id: string;
  name: string;
  release_date: string;
  total_tracks: number;
  href: string;
  uri: string;
  images: { url: string }[];
  external_url: string;
  artists: Artist[];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.release_date = data.release_date;
    this.total_tracks = data.total_tracks;
    this.href = data.href;
    this.uri = data.uri;
    this.images = data.images;
    this.external_url = data.external_urls?.spotify;
    this.artists = data.artists.map((artist: any) => new Artist(artist));
  }
}
