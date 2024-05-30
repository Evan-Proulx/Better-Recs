import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../enviroment";
import {UserAuthService} from "../authentication/user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {
  private tokenUrl = 'https://accounts.spotify.com/api/token';
  private accessToken: string = "";

  constructor(private http: HttpClient, private userauth: UserAuthService) { }

  getToken(): Observable<any> {
    const headers = new HttpHeaders({
      'content-type': 'application/x-www-form-urlencoded'
    });

    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', environment.clientId)
      .set('client_secret', environment.clientSecret);

    return this.http.post<any>(this.tokenUrl, body.toString(), {headers});
  }

  getArtist(artist: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ` + token
    });

    return this.http.get<any>(`https://api.spotify.com/v1/search?q=${artist}&type=artist`, {headers});
  }

  getRecommendations(token: string, artists: string[]): Observable<any> {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ` + token
    });

    return this.http.get<any>(
      `https://api.spotify.com/v1/recommendations?market=US&seed_artists=${artists}&limit=100&target_popularity=100`,
      {headers});
  }

  getTopAlbums(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ` + token
    });
    return this.http.get<any>(
      `https://api.spotify.com/v1/browse/new-releases?offset=0&limit=20`,
      {headers});
  }

  getAlbum(albumId: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ` + token
    });
    return this.http.get<any>(
      `https://api.spotify.com/v1/albums/${albumId}`,
      {headers});
  }


  tryArtists(): Observable<any> {
    return this.getUserTopArtists().pipe(
      catchError(error => {
        if (error.status === 401) { // Unauthorized, likely due to expired token
          return this.userauth.refreshAccessToken().then(() => {
            return this.getUserTopArtists();
          });
        } else {
          return throwError(error);
        }
      })
    );
  }

  private handleError(error: any){
    if (error.status === 401){
      this.userauth.refreshAccessToken();
    }
  }


  // needs user auth
  getUserTopArtists(): Observable<any> {
    const accessToken = this.userauth.getAccessToken();
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ` + accessToken
    });
    return this.http.get<any>(
      `https://api.spotify.com/v1/me/top/artists?limit=50`,
      {headers});
  }
}
