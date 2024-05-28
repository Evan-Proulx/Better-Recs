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
      `https://api.spotify.com/v1/recommendations?market=US&seed_artists=${artists}&limit=100`,
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

  // needs user auth
  // getUserTopArtists(): Observable<any> {
  //   const headers = new HttpHeaders({
  //     'content-type': 'application/json',
  //     'Authorization': `Bearer ` + 'AQD8AXVsCPx4FQar0KJADMO10mlWofXCtuc4V2lDtQkeP6q2aOfceWtsUi5LrHAqd6ERm0VCi59Z9oIibQpc8DFb4miZaWNgg9-23eFh2-JbrlUds3TlbmN3x4PEP8Jhcoge894qc1aLVSxUZdjIXIgCP6sDglSEsaU_VvmfKFa1H7XkL4szJgBu9SMFrUaxqoLNicsshB9gDr0F8jGB90kcIPAgAoZYuB_IOwBIsOT-MkHnpWzGd5-QsFf6zsqKPKr_f0_8SDypp-A9accUAgv66pAZzzLwPO0z6nh7pfEzoK_cplIJhQl_xbNNPwmgaab1Knf41NShb-Hqgf9JVoJ6CAQJ9Z3mYDNbzEAzBg'
  //   });
  //   return this.http.get<any>(
  //     `https://api.spotify.com/v1/me/top/artists?locale=en-US`,
  //     {headers});
  // }
}
