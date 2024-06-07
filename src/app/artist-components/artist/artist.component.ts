import {Component, Input} from '@angular/core';
import {Artist} from "../../models/artist";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {CdkDrag} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    NgIf,
    MatButton,
    MatIcon,
    CdkDrag
  ],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss'
})
export class ArtistComponent {
  //single artist from the list
  @Input() contentArtist?: Artist;
  @Input() isDetailed?: boolean;
}
