import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {SpotifyApiService} from "../../SpotifyApiService/spotify-api.service";
import {NgIf} from "@angular/common";
import {BackendService} from "../../backend-api/backend.service";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf,
    MatIcon
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  authenticated = false;
  constructor(private router: Router, private spotifyService: SpotifyApiService, private backend: BackendService) {}

  //sends user to auth page
  toAuth(){
    this.router.navigate(['callback']);
  }
  toLogin(){
    this.router.navigate(['login']);
  }
  toRegister(){
    this.router.navigate(['register']);
  }
  toSaved(){
    this.router.navigate(['saved-albums']);
  }

  // savedAlbums(){
  //   let token = localStorage.getItem('access_token');
  //   let ids: string[];
  //   console.log("TOken", token);
  //   if(token != null){
  //     this.backend.getAlbums(token).subscribe({
  //       next: (data) => {
  //         console.log('ALBUMS:', data);
  //         ids = data.data.map((album: { spotify_id: any; }) => album.spotify_id);
  //         console.log(ids);
  //       },
  //       error: (error) => {
  //         console.error("ERROR Getting saved albums: ", error);
  //       }
  //     });
  //   }else{
  //     console.log("token null")
  //   }
  // }


  ngOnInit(): void {
    console.log(this.spotifyService.checkAuthenticated());
    this.authenticated = this.spotifyService.checkAuthenticated();
  }



}
