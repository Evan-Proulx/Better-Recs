import {Component, OnInit} from '@angular/core';
import {UserAuthService} from "../user-auth.service";
import {MatIcon} from "@angular/material/icon";
import {NgOptimizedImage} from "@angular/common";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [
    MatIcon,
    NgOptimizedImage
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss'
})
export class AuthPageComponent implements OnInit {

  //once the authentication starts the spotify redirects to this page with the code
  //the auth service handles the code and we navigate to the main page
  constructor(private userauth: UserAuthService, private router: Router) {}
  ngOnInit(): void {
    if (window.location.search.includes('code=')) {
      this.userauth.handleAuthCallback()
        .then(() => {
          console.log('Authentication callback handled successfully');
          this.router.navigate(['']); // Navigate to the main route
        })
        .catch((error) => {
          console.error('Error handling authentication callback', error);
        });
      }
  }

  authenticate(){
    this.userauth.authenticate();
  }
}
