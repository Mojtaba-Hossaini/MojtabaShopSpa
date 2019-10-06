import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { AuthResponseData } from './authResponseData.model';
import { User } from './user.model';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user = new BehaviorSubject<User>(null);
    tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) {}

    signUp(email: string, password: string) {
        return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey,
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
        ('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey,
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            return;
        }

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogOut(expirationDuration);
        }
    }

    logOut() {
        this.user.next(null);
        localStorage.removeItem('userData');
        this.router.navigate(['/auth']);
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogOut(expirationDureation: number) {
        console.log(expirationDureation);
        this.tokenExpirationTimer = setTimeout(() => {
           this.logOut();
        }, expirationDureation);
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
        this.autoLogOut(expireIn * 1000);
        localStorage.setItem('userData', JSON.stringify(user));
    }

}