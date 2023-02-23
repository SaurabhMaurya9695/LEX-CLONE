import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseurl from './helper';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  //get current user who has generate token which is logged in
  public getCurrenrUser(){
    return this.http.get(`${baseurl}/current-user`)
  }

  //generate token
  public generateToken(loginData: any) {
    return this.http.post(`${baseurl}/generate-token`, loginData);
  }

  //login User's token set to local Storage ;
  public loginUser(token: any) {
    localStorage.setItem('token', token);
    return true;
  }

  //user is login or not -> if user has token means he is login otherwise logout;
  public isLoggedIn() {
    let str = localStorage.getItem('token'); // you can get via token;
    if (str == undefined || str == '' || str == null) {
      return false;
    }
    return true;
  }

  // to logout user , you have to remove the token from local storage ;
  public logout() {
    localStorage.removeItem('token');
    return true;
  }

  //get token from localstorage ;
  public getToken() {
    return localStorage.getItem('token');
  }

  //set userData to localStorage;
  public setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  //getUser from localStorage
  public getUser() {
    let usrStr = localStorage.getItem('user');
    if (usrStr != null) {
      return JSON.parse(usrStr); // converted into json object then return
    } else {
      this.logout();
      return null;
    }
  }

  //getUserRole
  public getUserRole() {
    let user = this.getUser();
    return user.authorities[0].authority;
  }
}
