import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { DetailsComponent } from './components/details/details.component';
import { ReactiveFormsModule } from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { SectionComponent } from './components/main/section/section.component';
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    MainComponent,
    DetailsComponent,
    SectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
