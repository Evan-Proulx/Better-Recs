import {Album} from "./album";

export class SavedAlbum {
  id: string;
  album: Album;


  constructor(id: string, album: Album) {
    this.id = id;
    this.album = album;
  }
}


