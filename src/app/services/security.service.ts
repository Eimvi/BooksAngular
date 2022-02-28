import { Subject } from 'rxjs';

import { Injectable } from '@angular/core';
import { User, LoginData } from '../interfaces';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  changeSecurity: Subject<boolean> = new Subject<boolean>();
  private user!: User;

  constructor(private router: Router) { }

  registerUser(user: User){
    this.user = {
      name: user.name,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      password: user.password,
      userId: Math.round(Math.random() * 10000).toString(),
    };

    this.changeSecurity.next(true);
  }

  loginUser(user: LoginData){
    this.user = {
      name: '',
      lastname: '',
      username: '',
      email: user.email,
      password: user.password,
      userId: Math.round(Math.random() * 10000).toString(),
    };

    this.changeSecurity.next(true);
    this.router.navigate(['/home']);

  }

  logoutUser(): void{
    // this.user = {};
    this.router.navigate(['/login']);
    this.changeSecurity.next(false);
  }

  get userInfo(){
    return { ...this.user }
  }
}
