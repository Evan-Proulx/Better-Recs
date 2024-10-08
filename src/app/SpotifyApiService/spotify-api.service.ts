import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, switchMap, throwError} from "rxjs";
import {environment} from "../../enviroment";
import {UserAuthService} from "../authentication/user-auth.service";

@Injectable({
  providedIn: 'root'
})
export class SpotifyApiService {
  private tokenUrl = 'https://accounts.spotify.com/api/token';
  private accessToken: string = "";

  constructor(private http: HttpClient, private userauth: UserAuthService) {
  }

  //Gets access token
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
  //searches for artists with given name
  getArtists(artist: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ` + token
    });

    return this.http.get<any>(`https://api.spotify.com/v1/search?q=${artist}&type=artist`, {headers});
  }
  //Gets album recommendations for given artists
  getArtistRecommendations(token: string, artists: string[], popularity: number): Observable<any> {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ` + token
    });

    return this.http.get<any>(
      `https://api.spotify.com/v1/recommendations?market=US&seed_artists=${artists}&limit=100&target_popularity=${popularity}`,
      {headers});
  }
  //Gets album recommendations for given tracks
  getTrackRecommendations(token: string, tracks: string[], popularity: number): Observable<any> {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ` + token
    });

    return this.http.get<any>(
      `https://api.spotify.com/v1/recommendations?market=US&seed_tracks=${tracks}&limit=100&target_popularity=${popularity}`,
      {headers});
  }

  //get spotify's top 20 tracks
  getTopAlbums(token: string): Observable<any> {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ` + token
    });
    return this.http.get<any>(
      `https://api.spotify.com/v1/browse/new-releases?offset=0&limit=20`,
      {headers});
  }

  //gets singular album from id
  getAlbums(albumIds: string[], token: string): Observable<any> {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ` + token
    });
    return this.http.get<any>(
      `https://api.spotify.com/v1/albums?ids=${albumIds}`,
      {headers});
  }
  //gets singular artist from id
  getArtist(artistId: string, token: string): Observable<any> {
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ` + token
    });
    return this.http.get<any>(
      `https://api.spotify.com/v1/artists/${artistId}`,
      {headers});
  }
  //gets new access token if the call returns a 401 error
  handleError(error: any) {
    if (error.status === 401) {
      this.userauth.refreshAccessToken();
    }
  }

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

  getUserTopTracks(): Observable<any> {
    const accessToken = this.userauth.getAccessToken();
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ` + accessToken
    });
    return this.http.get<any>(
      `https://api.spotify.com/v1/me/top/tracks?limit=50`,
      {headers});
  }
  //saves selected album to the users spotify library
  saveAlbum(id: string): Observable<any> {
    const accessToken = this.userauth.getAccessToken();
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ` + accessToken
    });

    return this.http.put<any>("https://api.spotify.com/v1/me/albums?", {ids: [id]}, {headers});
  }


  //check if an access token has been set
  checkAuthenticated(){
    console.log("Authenticated?",this.userauth.getAccessToken() != null)
    return this.userauth.getAccessToken() != null;
  }
}
