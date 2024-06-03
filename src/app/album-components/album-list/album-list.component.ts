import {booleanAttribute, Component, EventEmitter, Input, Output} from '@angular/core';
import {Album} from "../../models/album";
import {ArtistComponent} from "../../artist-components/artist/artist.component";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {AlbumComponent} from "../album/album.component";
import {CdkDrag} from "@angular/cdk/drag-drop";
import {SpotifyApiService} from "../../SpotifyApiService/spotify-api.service";
import {MatIcon} from "@angular/material/icon";
import { Artist } from '../../models/artist';
import {ModalData} from "../../models/ModalData";

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
  @Output() modalData = new EventEmitter<ModalData>();
  isModalDisplayed: boolean = false;
  modalAlbum: Album | undefined;
  isSaved: boolean = false;
  genres: string[] = [];
  formattedDate: string = "";

  constructor(private spotifyService: SpotifyApiService) {}

  ////////////////////////////////////////////////////////////////
  //MODAL METHODS
  ////////////////////////////////////////////////////////////////

  //closes the modal



  //toggles the modal and gets album from the api
  handleToggleModal(album: Album) {
    if (album) {
      //set clicked album to display in the modal
      this.modalAlbum = album;
      //format teh albums release date
      this.formatDate(album.release_date);
      //get artist info
      this.getArtist(this.modalAlbum.artists[0].id);
      this.isModalDisplayed = !this.isModalDisplayed;

      const modalData = new ModalData(this.modalAlbum, this.formattedDate, this.genres, this.isModalDisplayed);
      this.modalData.emit(modalData);
      console.log("Test", modalData)
    }
  }



 //gets detailed information about the artist
  getArtist(id: string){
    this.spotifyService.getArtist(id, this.token).subscribe({
      next: (data) => {
        console.log(data.genres);
        this.genres = data.genres;
      },
      error: (error) => {
        console.error("ERROR FETCHING TOKEN: ", error);
      }
    });
  }

  //extracts year from date(2024-02-06 -> 2024)
  formatDate(date: string){
    this.formattedDate = date.substring(0, 4);
  }

  //saves the selected album to the user's library
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
