import {Component, OnInit} from '@angular/core';
import {AlbumListComponent} from "../album-list/album-list.component";
import {MatIcon} from "@angular/material/icon";
import {NgIf} from "@angular/common";
import {Album} from "../../models/album";
import {BackendService} from "../../backend-api/backend.service";
import {SpotifyApiService} from "../../SpotifyApiService/spotify-api.service";
import {Track} from "../../models/track";
import {ModalData} from "../../models/ModalData";
import {AlbumModalComponent} from "../album-modal/album-modal.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-saved-albums',
  standalone: true,
  imports: [
    AlbumListComponent,
    MatIcon,
    NgIf,
    AlbumModalComponent
  ],
  templateUrl: './saved-albums.component.html',
  styleUrl: './saved-albums.component.scss'
})
export class SavedAlbumsComponent implements OnInit {

  savedAlbums: Album[] = [];
  accessToken: string = "";

  modalOpen: boolean = false;
  modalData: ModalData | undefined;

  loggedIn: boolean = false;

  constructor(private backend: BackendService, private spotifyService: SpotifyApiService, private router: Router) {}

  ngOnInit() {
    this.checkLoggedIn()
    if (this.loggedIn){
      this.spotifyService.getToken().subscribe({
        next: (data) => {
          this.accessToken = data.access_token;
        },
        error: (error) => {
          console.error("ERROR FETCHING TOKEN: ", error);
        }
      });
      this.getSavedAlbums();
    }
  }

  checkLoggedIn(){
    this.loggedIn = !!localStorage.getItem('access_token');
  }

  toHome() {
    this.router.navigate(['']);
  }
  toLogin() {
    this.router.navigate(['login']);
  }


  //gets the users saved albums from the backend
  getSavedAlbums() {
    let access_token = localStorage.getItem('access_token');
    let ids: string[];
    if (access_token != null) {
      //get ids of saved albums from backend
      this.backend.getAlbums(access_token).subscribe({
        next: (data) => {
          console.log('ALBUMS:', data);
          ids = data.data.map((album: { spotify_id: any; }) => album.spotify_id);
          //sort ids into groups of 20
          this.handleIds(ids);
        },
        error: (error) => {
          console.error("ERROR Getting saved albums: ", error);
        }
      });
    } else {
      console.log("token null")
    }
  }

  //retrieve albums from given ids
  displayAlbums(ids: string[]) {
    this.spotifyService.getAlbums(ids, this.accessToken).subscribe({
      next: (data) => {
        console.log("Albums", data);
        data.albums.forEach((item: any) => {
          this.savedAlbums.push(new Album(item));
        });
      },
      error: (error) => {
        console.error("ERROR FETCHING Albums: ", error);
      }
    });
  }

  //spotify api has a 20 id limit. This breaks the ids into arrays of 20 if needed
  handleIds(ids: string[]) {
    if (ids.length > 20) {
      let idsArr = [];
      //group into arrays of 20 ids
      for (let i = 0; i < ids.length; i += 20) {
        idsArr.push(ids.slice(i, i + 20));
      }
      //call function for each array of ids
      idsArr.forEach((idArray) => {
        this.displayAlbums(idArray);
      });
    } else {
      this.displayAlbums(ids);
    }
  }

  //when an album is deleted on the modal the page is refreshed
  refreshPage() {
    this.router.navigate(['/saved-albums']);
    console.log("refreshing...");
  }
  //logic for displaying the modal
  handleModalDisplayed(modalData: ModalData) {
    this.modalData = modalData;
    this.modalOpen = true;
  }
  closeModal(){
    this.modalOpen = false;
  }
}
