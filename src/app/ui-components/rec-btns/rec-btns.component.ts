import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-rec-btns',
  standalone: true,
  imports: [],
  templateUrl: './rec-btns.component.html',
  styleUrl: './rec-btns.component.scss'
})
export class RecBtnsComponent {
  @Output() getRecommendations = new EventEmitter<void>();
  @Output() resetDraggedArtists = new EventEmitter<void>();
  @Output() selectedPopularity = new EventEmitter<number>();

  //These methods communicate with the main component to call a method when these buttons are clicked
  onGetRecommendations() {
    this.getRecommendations.emit();
  }
  onResetDraggedArtists() {
    this.resetDraggedArtists.emit();
  }

  setPopularity(popularity: number) {
    this.selectedPopularity.emit(popularity);
  }
}
