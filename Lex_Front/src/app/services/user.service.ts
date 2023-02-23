import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseurl from './helper';
// import { user } from '../pages/register/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  //adding user ->this gives us observal and we can subscribe
  // we pass user and make a post request to the url
  public addUser(user: any): Observable<any> {
    return this.http.post<any>(`${baseurl}/user/`, user);
  }
}
