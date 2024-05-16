import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../enviroment";

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {
  private tokenUrl = 'https://accounts.spotify.com/api/token';
  private accessToken: string = "";

  constructor(private http: HttpClient) { }

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
      `https://api.spotify.com/v1/recommendations?market=US&seed_artists=${artists}`,
      {headers});
  }
}
