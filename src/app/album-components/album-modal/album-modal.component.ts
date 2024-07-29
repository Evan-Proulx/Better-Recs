import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgIf, NgStyle} from "@angular/common";
import {Album} from "../../models/album";
import {SpotifyApiService} from "../../SpotifyApiService/spotify-api.service";
import {ModalData} from "../../models/ModalData";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {BackendService} from "../../backend-api/backend.service";
import {convertToParamMap} from "@angular/router";

@Component({
  selector: 'app-album-modal',
  standalone: true,
  imports: [
    MatIcon,
    NgForOf,
    NgIf,
    NgStyle
  ],
  templateUrl: './album-modal.component.html',
  styleUrl: './album-modal.component.scss'
})
export class AlbumModalComponent implements OnInit {
  @Input() savedComponent: boolean = false;
  @Input() modalData: ModalData | undefined;
  @Output() close = new EventEmitter<void>();
  isSaved: boolean = false;
  album: Album |  undefined;
  constructor(private spotifyService: SpotifyApiService, private backend: BackendService) {}

  closeModal(){
    this.close.emit();
  }

  // saveAlbum(id: string){
  //   this.spotifyService.saveAlbum(id).subscribe({
  //     next: (data) => {
  //       console.log('album saved', data);
  //       this.isSaved = true;
  //     },
  //     error: (error) => {
  //       console.error("ERROR FETCHING TOKEN: ", error);
  //     }
  //   });
  // }

  //saves album to users saved albums
  saveAlbum(data: ModalData){
    let token = localStorage.getItem('access_token');
    if(token != null){
      this.backend.addAlbum(data, token).subscribe({
        next: (data) => {
          console.log('album saved', data);
          this.isSaved = true;
        },
        error: (error) => {
          console.error("ERROR SAVING ALBUM: ", error);
        }
      });
    }else{
      console.log("token null")
    }
  }

  deleteAlbum( id: string){
    let token = localStorage.getItem('access_token');
    if(token != null) {
      this.backend.deleteAlbum(token, id).subscribe({
        next: (data) => {
          console.log('album deleted', data);
        },
        error: (error) => {
          console.error("ERROR SAVING ALBUM: ", error);
        }
      })
    }else{
      console.error("ERROR DELETING ALBUM: ", error);
    }
  }

  ngOnInit(): void {
    console.log(this.modalData);
  }
}
