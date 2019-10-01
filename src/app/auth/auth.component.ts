import { AuthResponseData } from './authResponseData.model';
import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoadning = false;
  error: string = null;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  osSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    let authObs: Observable<AuthResponseData>;
    this.isLoadning = true;
    if (this.isLoginMode) {
     authObs = this.authService.login(form.value.email, form.value.password);
    } else {
    authObs =  this.authService.signUp(form.value.email, form.value.password);
  }

    authObs.subscribe( responseData => {
      console.log(responseData);
      this.isLoadning = false;
    }, errorMessage => {
      console.log(errorMessage);
      this.error = errorMessage;
      this.isLoadning = false;
    });
    form.reset();
  }

}
