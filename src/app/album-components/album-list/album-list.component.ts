import {Component, Input} from '@angular/core';
import {Album} from "../../models/album";
import {ArtistComponent} from "../../artist-components/artist/artist.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {AlbumComponent} from "../album/album.component";
import {CdkDrag} from "@angular/cdk/drag-drop";
import {SpotifyApiService} from "../../SpotifyApiService/spotify-api.service";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-album-list',
  standalone: true,
  imports: [
    ArtistComponent,
    NgForOf,
    AlbumComponent,
    CdkDrag,
    NgIf,
    MatIcon,
    NgClass
  ],
  templateUrl: './album-list.component.html',
  styleUrl: './album-list.component.scss'
})
export class AlbumListComponent {
  @Input() albums: Album[] = [];
  @Input() token: string = "";
  isModalDisplayed: boolean = false;
  modalAlbum: Album | undefined;
  isSaved: boolean = false;

  constructor(private spotifyService: SpotifyApiService) {}

  //closes the modal
  closeModal() {
    this.isModalDisplayed = !this.isModalDisplayed;
  }

  //toggles the modal and gets album from the api
  handleToggleModal(album: Album) {
    if (album){
      this.getAlbum(album.id)
    }
    this.isModalDisplayed = !this.isModalDisplayed;
  }

  //gets detailed information about the selected album
  getAlbum(id: string){
    this.spotifyService.getAlbum(id, this.token).subscribe({
      next: (data) => {
        console.log(data);
        this.modalAlbum = data;
      },
      error: (error) => {
        console.error("ERROR FETCHING TOKEN: ", error);
      }
    });
  }

  saveAlbum(id: string){
    this.spotifyService.saveAlbum(id).subscribe({
      next: (data) => {
        console.log('album saved', data);
        this.isSaved = true;
      },
      error: (error) => {
        console.error("ERROR FETCHING TOKEN: ", error);
      }
    });
  }

}
