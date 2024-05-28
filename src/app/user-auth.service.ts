import {Injectable} from '@angular/core';
import {environment} from "../enviroment";

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  clientId = environment.clientId;
  clientSecret = environment.clientSecret;
  redirectUri = 'http://localhost:4200/callback';

  constructor() {
  }

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

  getCodeFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('code');
  }

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
  }
  async handleAuthCallback() {
    const code = this.getCodeFromUrl();
    if (code) {
      const tokenData = await this.exchangeCodeForToken(code);
      console.log('Access Token Data:', tokenData);
      // Store tokenData.access_token and tokenData.refresh_token as needed
    } else {
      console.error('No code found in URL');
    }
  }

}
