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
  spotifyAuthenticated = false;
  loggedIn: boolean = false;
  constructor(private router: Router, private spotifyService: SpotifyApiService) {}

  toAuth(){
    this.router.navigate(['callback']);
  }
  toLogin(){
    this.router.navigate(['login']);
  }
  toRegister(){
    this.router.navigate(['register']);
  }


  ngOnInit(): void {
    console.log(this.spotifyService.checkAuthenticated());
    this.spotifyAuthenticated = this.spotifyService.checkAuthenticated();
    this.checkLoggedIn()
  }

  //checks if user is logged in
  checkLoggedIn(){
    this.loggedIn = !!localStorage.getItem('access_token');
  }
  //removes the access token from local storage and refreshes the page
  logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
    this.checkLoggedIn();

    this.router.navigateByUrl('/callback', { skipLocationChange: true }).then(() => {
      this.router.navigate(['']);
      console.log("refreshing...");
    });  }



}
