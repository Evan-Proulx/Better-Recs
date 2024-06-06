import { Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {AuthPageComponent} from "./authentication/auth-page/auth-page.component";
import {TestComponent} from "./test/test.component";

export const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'test', component: TestComponent},
  {path: 'callback', component: AuthPageComponent},
];
