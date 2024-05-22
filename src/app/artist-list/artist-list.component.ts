import {Component, Input} from '@angular/core';
import {ArtistComponent} from "../artist/artist.component";
import {NgForOf} from "@angular/common";
import {Artist} from "../models/artist";

@Component({
  selector: 'app-artist-list',
  standalone: true,
  imports: [
    ArtistComponent,
    NgForOf
  ],
  templateUrl: './artist-list.component.html',
  styleUrl: './artist-list.component.scss'
})
export class ArtistListComponent {
  //list of artists from the test component
  @Input() artists: Artist[] = [];
  @Input() isDetailed?: boolean;


}
