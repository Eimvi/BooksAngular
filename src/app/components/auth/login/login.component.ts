import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { LoginData } from 'src/app/interfaces';
import { SecurityService } from 'src/app/services/security.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(private _fb: FormBuilder, private securityService: SecurityService) { }

  ngOnInit(): void {
    this.createForm();
  }

  login(){
    const user: LoginData = {
      email: '',
      password: ''
    }
    this.securityService.loginUser(user);
  }

  createForm() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

}
