import {Injectable} from '@angular/core';
import {environment} from "../../enviroment";
import {mergeMap, Observable, retryWhen} from "rxjs";

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
      "user-modify-playback-state",
      "user-top-read"
    ];
    const url = `https://accounts.spotify.com/authorize?client_id=${encodeURIComponent(this.clientId)}&response_type=code&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}`;
    window.location.href = url;
  }

  //extracts the code from the url
  getCodeFromUrl(): string | null {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    console.log('Extracted code from URL:', code);
    return code;
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
        this.clearTokens();
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


  //get a new access token when the access token expires
  async refreshAccessToken(): Promise<void> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.access_token) {
      localStorage.setItem('spotify_access_token', data.access_token);
      console.log('Access Token refreshed:', data.access_token);
    } else {
      console.error('Failed to refresh access token:', data);
    }
  }

  getAccessToken(): string | null {
    console.log('Access Token:', localStorage.getItem('spotify_access_token'));
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
