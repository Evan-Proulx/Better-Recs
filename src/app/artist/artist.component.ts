import {Component, Input} from '@angular/core';
import {Artist} from "../models/artist";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    NgIf
  ],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss'
})
export class ArtistComponent {
  //single artist from the list
  @Input() contentArtist?: Artist;
  constructor() { }

}
