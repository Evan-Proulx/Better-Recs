import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TestComponent} from "./test/test.component";
import {ArtistComponent} from "./artist-components/artist/artist.component";
import {initFlowbite} from "flowbite";
import {MainComponent} from "./main/main.component";
import {AuthPageComponent} from "./authentication/auth-page/auth-page.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TestComponent, ArtistComponent, MainComponent, AuthPageComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'SpotifyApp';

  ngOnInit(): void {
    initFlowbite();
  }
}
