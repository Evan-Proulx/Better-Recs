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
import {UserAuthService} from "../authentication/user-auth.service";

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

  accessToken: string = "";
  private artistId: string = "";
  private artists: string[] = [];
  recommendedAlbums: Album[] = [];
  constructor(private spotifyService: SpotifyApiService,
              private artistService: ArtistService, private userauth: UserAuthService) { }

  ngOnInit(): void {
    this.spotifyService.getToken().subscribe({
      next: (data) => {
        this.accessToken = data.access_token;
        console.log("TOKEN:", this.accessToken);
        this.getTopAlbums();
      },
      error: (error) => {
        console.error("ERROR FETCHING TOKEN: ", error);
      }
    });
  }

  getTopAlbums(): void {
    this.spotifyService.getTopAlbums(this.accessToken).subscribe({
      next: (data) => {
        console.log(data);
        this.recommendedAlbums = data.albums.items.map((item: any) => new Album(item));
      },
      error: (error) => {
        console.error("ERROR FETCHING RECOMMENDATIONS: ", error);
      }
    });
  }


  getUserTopArtists(): void {
    this.spotifyService.getUserTopArtists().subscribe({
      next: (data) => {
        console.log(data)
      },
      error: (error) => {
        console.error("ERROR FETCHING RECOMMENDATIONS: ", error);
      }
    });
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
