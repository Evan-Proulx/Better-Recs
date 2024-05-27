import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Album} from "../../models/album";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss'
})
export class AlbumComponent {
  @Input() contentAlbum?: Album;
  @Input() isModalOpen?: boolean = false;
  @Output() toggleModal: EventEmitter<Album | void> = new EventEmitter<Album | void>();

  toggleDetails() {
    if (this.contentAlbum) {
      this.toggleModal.emit(this.contentAlbum);
    } else {
      this.toggleModal.emit();
    }  }
}
