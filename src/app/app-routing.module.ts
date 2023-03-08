import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {ProfileComponent} from "./components/profile/profile.component";

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: "full" },
  { path: 'profile', component: ProfileComponent, pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
