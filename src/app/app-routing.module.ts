import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {ProfileComponent} from "./components/profile/profile.component";
import {GridComponent} from "./components/grid/grid.component";
import {DetailsComponent} from "./components/details/details.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'search', component: GridComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: '%', redirectTo: 'not-found', pathMatch: "full" }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
