import { AuthService } from './auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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
    this.isLoadning = true;
    this.authService.signUp(form.value.email, form.value.password).subscribe( responseData => {
      console.log(responseData);
      this.isLoadning = false;
    }, error => {
      console.log(error);
      switch (error.error.error.message) {
        case 'EMAIL_EXISTS':
          this.error = 'با این ایمیل قبلا حساب کاربری ایجاد شده است';
          break;
        case 'OPERATION_NOT_ALLOWED':
          this.error = 'شما مجاز به انجام این عملیات نیستید';
          break;
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          this.error = 'بیشتر از حد مجاز تلاش کردید لطفا بعدا تلاش کنید';
          break;
      }
      this.isLoadning = false;
    });
    form.reset();
  }

}
