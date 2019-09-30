import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {}

    signUp(email: string, password: string) {
        return this.http
        .post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBrQ6MyqiFVLuMpbC18s0TuYmI-hjzdjkA',
        {
            email: email,
            password: password,
            returnSecureToken: true
        });
    }

}