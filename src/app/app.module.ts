import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from "@angular/forms";

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { HomeComponent } from './pages/home/home.component';
import { BarComponent } from './components/bar/bar.component';
import { ListComponent } from './components/list/list.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { BooksComponent } from './components/books/books.component';

//Services
import { BooksService } from './services/books.service';
import { SecurityService } from './services/security.service';
import { BookModalComponent } from './components/book-modal/book-modal.component';

import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    SidenavComponent,
    HomeComponent,
    BarComponent,
    ListComponent,
    NotFoundComponent,
    BooksComponent,
    BookModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [
    BooksService,
    SecurityService,
    {provide: MAT_DATE_LOCALE, useValue: 'es-ES'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
