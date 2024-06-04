import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Artist} from "../../models/artist";

@Injectable({
  providedIn: 'root'
})
//This allows to share data between components
export class ArtistService {
  private artistListSubject = new BehaviorSubject<string[]>([]);
  artistList$ = this.artistListSubject.asObservable();
  constructor() { }

  addToArtistList(artistID: string, artist: Artist) {
    const currentList = this.artistListSubject.getValue();
    const updatedList = [...currentList, artistID];
    this.artistListSubject.next(updatedList);
  }
}
