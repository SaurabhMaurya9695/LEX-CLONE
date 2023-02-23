import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseurl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  // private baseUrl = "localhost:9000";
  constructor(private http : HttpClient) { }

  public getCategories()
  {
    return this.http.get(`${baseurl}/category/`)
  }

  //add category
  public addcategory(category: any):Observable<any>
  {
    return this.http.post<any>(`${baseurl}/category/` , category);
  }

  //deleteQuiz
  public delete(id:any):Observable<any>
  {
    return this.http.delete<any>(`${baseurl}/category/${id}` , id);
  }
}
