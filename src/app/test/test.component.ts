import {Component, OnInit} from '@angular/core';
import {SpotifyApiService} from "../SpotifyApiService/spotify-api.service";

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css'
})
export class TestComponent implements OnInit {
  private accessToken: string = "";

  constructor(private spotifyService: SpotifyApiService) { }
  ngOnInit(): void {
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

}
