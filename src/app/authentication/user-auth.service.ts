import {Injectable} from '@angular/core';
import {environment} from "../../enviroment";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  //params needed for authentication
  clientId = environment.clientId;
  clientSecret = environment.clientSecret;
  redirectUri = 'http://localhost:4200/callback';
  constructor() {}

  //send user to spotify auth page
  authenticate() {
    const scopes = [
      "streaming",
      "user-read-email",
      "user-read-private",
      "user-library-read",
      "user-library-modify",
      "user-read-playback-state",
      "user-modify-playback-state"
    ];
    const url = `https://accounts.spotify.com/authorize?client_id=${encodeURIComponent(this.clientId)}&response_type=code&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}`;
    window.location.href = url;
  }

  //extracts the code from the url
  getCodeFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('code');
  }

  //take code from url and uses authentication to get access and refresh token
  async exchangeCodeForToken(code: string) {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: this.redirectUri
      })
    });

    return await response.json();
  }

  //store access and refresh token locally
  async handleAuthCallback() {
    const code = this.getCodeFromUrl();
    if (code) {
      const tokenData = await this.exchangeCodeForToken(code);
      if (tokenData && tokenData.access_token) {
        console.log('Access Token Data:', tokenData);
        //store tokens
        localStorage.setItem('spotify_access_token', tokenData.access_token);
        localStorage.setItem('spotify_refresh_token', tokenData.refresh_token);
        // Remove code from URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } else {
        console.error('Failed to get access token:', tokenData);
      }
    } else {
      console.error('No code found in URL');
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem('spotify_access_token');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('spotify_refresh_token');
  }

  clearTokens() {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_refresh_token');
  }
}
