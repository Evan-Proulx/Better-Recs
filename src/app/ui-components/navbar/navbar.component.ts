import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {SpotifyApiService} from "../../SpotifyApiService/spotify-api.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  authenticated = false;
  constructor(private router: Router, private spotifyService: SpotifyApiService) {}

  //sends user to auth page
  toAuth(){
    this.router.navigate(['callback']); // Navigate to the main route
  }
  toLogin(){
    this.router.navigate(['login']); // Navigate to the main route
  }
  toRegister(){
    this.router.navigate(['register']); // Navigate to the main route
  }

  ngOnInit(): void {
    console.log(this.spotifyService.checkAuthenticated());
    this.authenticated = this.spotifyService.checkAuthenticated();
  }



}
