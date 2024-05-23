import {Component, Input} from '@angular/core';
import {Album} from "../models/album";
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

}
