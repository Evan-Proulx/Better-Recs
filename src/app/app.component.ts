import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TestComponent} from "./test/test.component";
import {ArtistComponent} from "./artist/artist.component";
import {initFlowbite} from "flowbite";
import {MainComponent} from "./main/main.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TestComponent, ArtistComponent, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'SpotifyApp';

  ngOnInit(): void {
    initFlowbite();
  }
}
