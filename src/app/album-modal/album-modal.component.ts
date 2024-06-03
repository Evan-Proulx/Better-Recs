import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {NgForOf, NgIf} from "@angular/common";
import {Album} from "../models/album";
import {SpotifyApiService} from "../SpotifyApiService/spotify-api.service";
import {ModalData} from "../models/ModalData";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-album-modal',
  standalone: true,
    imports: [
        MatIcon,
        NgForOf,
        NgIf
    ],
  templateUrl: './album-modal.component.html',
  styleUrl: './album-modal.component.scss'
})
export class AlbumModalComponent implements OnInit {
  @Input() modalData: ModalData | undefined;
  @Output() close = new EventEmitter<void>();
  isSaved: boolean = false;
  album: Album |  undefined;


  constructor(private spotifyService: SpotifyApiService) {}

  closeModal(){
    this.close.emit();
  }

  saveAlbum(id: string){
    this.spotifyService.saveAlbum(id).subscribe({
      next: (data) => {
        console.log('album saved', data);
        this.isSaved = true;
      },
      error: (error) => {
        console.error("ERROR FETCHING TOKEN: ", error);
      }
    });
  }

  ngOnInit(): void {
    if (this.modalData){
    }

    console.log(this.modalData);
  }
}
