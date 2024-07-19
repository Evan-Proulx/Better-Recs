import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private accessToken: string = "";

  constructor(private http: HttpClient) { }

  createUser(data: any): Observable<ApiResponse>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<ApiResponse>('http://127.0.0.1:8000/api/reg', data, {headers});
  }

  loginUser(data: any){
    const headers = new HttpHeaders({
      'content-type': 'application/json'
    });

    return this.http.post<ApiResponse>('http://127.0.0.1:8000/api/auth', data, {headers});
  }

  getAlbums(){

  }

  addAlbum(){

  }
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
