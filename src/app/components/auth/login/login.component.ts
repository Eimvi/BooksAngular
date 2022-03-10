import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";

import { Subscription } from 'rxjs';
import { LoginData } from 'src/app/interfaces';
import { SecurityService } from 'src/app/services/security.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  subscription: Subscription = new Subscription();
  loginForm!: FormGroup;

  constructor(private _fb: FormBuilder,
              private securityService: SecurityService) { }

  ngOnInit(): void {
    this.createForm();
  }

  login(): void{
    const user: LoginData = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }

    this.subscription.add(
      this.securityService.loginUser(user)
        .subscribe(( response ) => {
          console.log(response);

        })
    )

  }

  createForm() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

}
