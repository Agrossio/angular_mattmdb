import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './components/header/register/register.component';
import { LoginComponent } from './components/header/login/login.component';
import { MainComponent } from './components/main/main.component';
import { DetailsComponent } from './components/details/details.component';
import { ReactiveFormsModule } from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { SectionComponent } from './components/main/section/section.component';
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {SessionService} from "./services/session.service";
import { ProfileComponent } from './components/profile/profile.component';
import { GridComponent } from './components/grid/grid.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    MainComponent,
    DetailsComponent,
    SectionComponent,
    ProfileComponent,
    GridComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [SessionService],  // al poner la sesion como provider hacemos que se genere una sola instancia del servicio que se comparte en toda la app
  bootstrap: [AppComponent]
})
export class AppModule { }
