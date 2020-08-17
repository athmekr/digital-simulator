import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthData } from './auth-data.model';
//import { response } from '../../../backend/app';

@Injectable({providedIn: 'root'})

export class AuthService {
  private token: string;

  constructor(private http: HttpClient) {}

  getToken(){
    return this.token;
  }

  createUser(email: string, password: string){
    const AuthData: AuthData = {
      email: email,
      password: password
    };
    this.http.post('http://localhost:3000/api/user/signup', AuthData)
      .subscribe(response => {
        console.log(response);
      });
  }

  login(email: string, password: string){
    const AuthData: AuthData = {
      email: email,
      password: password
    };
    this.http.post<{token: string}>('http://localhost:3000/api/user/login', AuthData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
      });
  }
}
