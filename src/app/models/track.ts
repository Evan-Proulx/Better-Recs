import {Album} from "./album";
import {Artist} from "./artist";

export class Track {
  id: string;
  name: string;
  durationMs: number;
  explicit: boolean;
  href: string;
  uri: string;
  previewUrl: string;
  externalUrl: string;
  album: Album;
  artists: Artist[];

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.durationMs = data.duration_ms;
    this.explicit = data.explicit;
    this.href = data.href;
    this.uri = data.uri;
    this.previewUrl = data.preview_url;
    this.externalUrl = data.external_urls?.spotify;
    this.album = new Album(data.album);
    this.artists = data.artists.map((artist: any) => new Artist(artist));
  }
}
