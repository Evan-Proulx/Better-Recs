import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Album} from "../models/album";
import {ModalData} from "../models/ModalData";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private accessToken: string = "";

  constructor(private http: HttpClient) { }

  createUser(data: any): Observable<ApiResponse>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    return this.http.post<ApiResponse>('http://127.0.0.1:8000/api/reg', data, {headers});
  }

  loginUser(data: any){
    const headers = new HttpHeaders({
      'content-type': 'application/json'
    });

    return this.http.post<ApiResponse>('http://127.0.0.1:8000/api/auth', data, {headers});
  }

  getAlbums(token: string){
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ` + token
    });

    return this.http.get<any>('http://127.0.0.1:8000/api/albums', {headers});
  }

  deleteAlbum(token: string, id: string){
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ` + token
    });

    return this.http.delete<any>(`http://127.0.0.1:8000/api/albums/${id}`, {headers});
  }

  addAlbum(data: ModalData, token: string){
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': `Bearer ` + token
    });

    //modalData is used instead of the album itself for more album details
    const albumData = {
      spotify_id: data.album.id,
      title: data.album.name,
      artist: data.album.artists[0].name,
      release_date: data.formattedDate,
      genre: data.genres[0],
      image_url: data.album.images[0].url
    };

    return this.http.post<any>(`http://127.0.0.1:8000/api/albums`, albumData, { headers });
  }






  // setAccessToken(){
  //   let token = localStorage.getItem('access_token');
  //   if(token != null && token != ""){
  //     this.accessToken = token;
  //   }
  // }
}

export interface User {
  name: string;
  email: string;
  updated_at: string;
  created_at: string;
  id: number;
}

export interface ApiResponse {
  message: string;
  data: {
    token: string;
    user: User;
  };
}

