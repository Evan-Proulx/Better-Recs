import {Album} from "./album";

export class ModalData {
  album: Album;
  formattedDate: string;
  genres: string[];
  isOpen: boolean;

  constructor(album: any, formattedDate: string, genres: string[], isOpen: boolean) {
    this.album = album;
    this.formattedDate = formattedDate;
    this.genres = genres;
    this.isOpen = isOpen;
  }
}
