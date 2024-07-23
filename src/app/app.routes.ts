import { Routes } from '@angular/router';
import {TestComponent} from "./test/test.component";
import {MainComponent} from "./main/main.component";
import {AuthPageComponent} from "./authentication/auth-page/auth-page.component";
import {UserLoginComponent} from "./authentication/user-login/user-login.component";
import {UserRegisterComponent} from "./authentication/user-register/user-register.component";
import {SavedAlbumsComponent} from "./album-components/saved-albums/saved-albums.component";

export const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'test', component: TestComponent},
  {path: 'callback', component: AuthPageComponent},
  {path: 'register', component: UserRegisterComponent},
  {path: 'login', component: UserLoginComponent},
  {path: 'saved-albums', component: SavedAlbumsComponent},
];
