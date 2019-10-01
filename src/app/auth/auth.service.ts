import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject } from 'rxjs';
import { AuthResponseData } from './authResponseData.model';
import { User } from './user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user = new Subject<User>();

    constructor(private http: HttpClient) {}

    signUp(email: string, password: string) {
        return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBrQ6MyqiFVLuMpbC18s0TuYmI-hjzdjkA',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>
        ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBrQ6MyqiFVLuMpbC18s0TuYmI-hjzdjkA',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage = 'مشکلی پیش آمد';
        if (!errorRes.error || !errorRes.error.error) {
                return throwError(errorMessage);
            }
        switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                  errorMessage = 'با این ایمیل قبلا حساب کاربری ایجاد شده است';
                  break;
                case 'OPERATION_NOT_ALLOWED':
                  errorMessage = 'شما مجاز به انجام این عملیات نیستید';
                  break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                  errorMessage = 'بیشتر از حد مجاز تلاش کردید لطفا بعدا تلاش کنید';
                  break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'با این ایمیل در سایت ما ثبت نام انجام نشده است';
                    break;
                case 'INVALID_PASSWORD':
                    errorMessage = 'نام کاربری یا رمز عبور اشتباه میباشند';
                    break;
                case 'USER_DISABLED':
                    errorMessage = 'این حساب کاربری غیر فعال میباشد';
                    break;
              }
        return throwError(errorMessage);
    }

    private handleAuthentication(email: string, userId: string, token: string, expireIn: number) {
        const expirationDate = new Date(new Date().getTime() + expireIn * 1000);
        const user = new User(email, userId, token, expirationDate);
        this.user.next(user);
    }

}