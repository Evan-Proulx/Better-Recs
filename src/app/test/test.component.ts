import {Component, OnInit} from '@angular/core';
import {SpotifyApiService} from "../SpotifyApiService/spotify-api.service";
import {FormsModule} from "@angular/forms";
import {ArtistListComponent} from "../artist-components/artist-list/artist-list.component";
import {Artist} from "../models/artist";
import {NgForOf, NgIf} from "@angular/common";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from "@angular/material/sidenav";
import {ArtistService} from "../artist-components/ArtistService/artist.service";
import {Album} from "../models/album";
import {Track} from "../models/track";
import {AlbumListComponent} from "../album-components/album-list/album-list.component";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {UserAuthService} from "../user-auth.service";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    FormsModule,
    ArtistListComponent,
    NgForOf,
    NgIf,
    MatFormField,
    MatInput,
    MatButton,
    MatDrawerContent,
    MatDrawer,
    MatDrawerContainer,
    AlbumListComponent,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.scss'
})
export class TestComponent implements OnInit {
  defaultArtist: Artist = {
    id: 'defaultId',
    name: 'Default Artist',
    genres: ['Default Genre'],
    popularity: 0,
    followers: 0,
    externalUrl: 'https://default-url.com',
    images: [{ url: 'default-image-url', height: 100, width: 100 }],
    isFavorite: false
  };
  searchText: string = "b";
  selectedArtists= [this.defaultArtist];
  draggedArtists= [this.defaultArtist];
  favoriteArtists: string[] = [];


  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];

  dragWordList = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "imbe", "jackfruit", "kiwi", "lemon", "mango", "nectarine", "orange", "papaya", "quince", "raspberry", "strawberry", "tangerine"];
  dropWordList= ["afdafasfda"];


  private accessToken: string = "";
  private artistId: string = "";
  private artists: string[] = [];
  constructor(private spotifyService: SpotifyApiService,
              private artistService: ArtistService, private userauth: UserAuthService) { }

  ngOnInit(): void {
    if (window.location.search.includes('code=')) {
      this.userauth.handleAuthCallback()
        .then(() => {
          console.log('Authentication callback handled successfully');
        })
        .catch((error) => {
          console.error('Error handling authentication callback', error);
        });
    }
  }

  authenticate(){
    this.userauth.authenticate();
  }



  // getAlbum(){
  //   this.spotifyService.getAlbum("3ZOz5WED7SNRykujcrvXUZ", this.accessToken).subscribe({
  //     next: (data) => {
  //       console.log(data);
  //     },
  //     error: (error) => {
  //       console.error("ERROR FETCHING TOKEN: ", error);
  //     }
  //   });
  // }

}
