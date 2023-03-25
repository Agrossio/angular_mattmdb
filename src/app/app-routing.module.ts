import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {DetailsComponent} from "./components/details/details.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {FavoritesComponent} from "./components/favorites/favorites.component";
import {SearchComponent} from "./components/search/search.component";

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: 'search/', component: SearchComponent },
  { path: 'search/:searchString', component: SearchComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'details/:media_type/:id', component: DetailsComponent },
  { path: '*', redirectTo: 'not-found', pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
