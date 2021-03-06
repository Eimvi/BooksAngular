import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { BooksComponent } from './components/books/books.component';
import { AutorsComponent } from './components/autors/autors.component';
import { AuthUserGuard } from './guards/auth-user.guard';

const routes: Routes = [
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'books', component: BooksComponent, canActivate: [AuthUserGuard]
  },
  {
    path: 'autors', component: AutorsComponent, canActivate: [AuthUserGuard]
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthUserGuard]
  },
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },
  {
    path: '**', component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
