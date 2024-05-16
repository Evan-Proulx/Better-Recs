import {Component, OnInit} from '@angular/core';
import {SpotifyApiService} from "../SpotifyApiService/spotify-api.service";
import {FormsModule} from "@angular/forms";
import {ArtistListComponent} from "../artist-list/artist-list.component";
import {Artist} from "../models/artist";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [
    FormsModule,
    ArtistListComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {
  searchText: string = "";
  artistList: Artist[] = [];

  private accessToken: string = "";
  private artistId: string = "";
  private artists: string[] = [];
  constructor(private spotifyService: SpotifyApiService) { }

  ngOnInit(): void {
    //Gets the access token when the app first loads
    this.spotifyService.getToken().subscribe({
      next: (data) => {
        this.accessToken = data.access_token;
        console.log("TOKEN:", this.accessToken);
      },
      error: (error) => {
        console.error("ERROR FETCHING TOKEN: ", error);
      }
    });
  }

  //adds the artist id to the array of artists
  addArtist(): void {
    this.artists.push(this.artistId);
    this.searchText = '';
    console.log(this.artists)
  }

  //gets the artist id from the artist
  getArtist(): void {
    if (this.searchText){
      this.spotifyService.getArtist(this.searchText, this.accessToken).subscribe({
        next: (data) => {
          console.log(data.artists.items[0].id);
          this.artistId = data.artists.items[0].id;
          this.artistList = data.artists.items.map((item: any) => new Artist(item));
        },
        error: (error) => {
          console.error("ERROR FETCHING ARTIST: ", error);
        }
      });
    }else{
      console.log("Please enter an artist name");
    }
  }


  //gets recommendations based on artists in given array
  getRecommendations(): void {
    this.spotifyService.getRecommendations(this.accessToken, this.artists).subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error("ERROR FETCHING RECOMMENDATIONS: ", error);
      }
    });
  }

}
