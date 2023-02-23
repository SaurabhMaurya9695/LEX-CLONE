import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseurl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  constructor(private http: HttpClient) {}

  //get all quizes
  public getQuiz(): Observable<any> {
    return this.http.get<any>(`${baseurl}/quiz/`);
  }

  //Loading Category
  public LoadCategories(): Observable<any> {
    return this.http.get<any>(`${baseurl}/category/`);
  }

  public AddQuiz(data: any): Observable<any> {
    return this.http.post<any>(`${baseurl}/quiz/`, data);
  }

  //delete the quiz
  public DeleteQuiz(id: any) {
    return this.http.delete(`${baseurl}/quiz/${id}`, id);
  }

  //get The single quiz;
  public getSingleQuiz(qid: any): Observable<any> {
    return this.http.get<any>(`${baseurl}/quiz/${qid}`, qid);
  }

  //update Quiz
  public updateQuiz(data: any) {
    return this.http.post<any>(`${baseurl}/quiz/`, data);
  }

  // getQuestionbased on categoryId
  public getQuizBasedonCid(val : any):Observable<any>
  {
     return this.http.get<any>(`${baseurl}/quiz/category/${val}`);
  }

  //getOnlyActive Quizzes
  public getActiveQuizzes():Observable<any>
  {
    return this.http.get<any>(`${baseurl}/quiz/active`);
  }

  public getAllActiveQuizBasedOnCategory(cid : any)
  {
    return this.http.get<any>(`${baseurl}/quiz/category/active/${cid}`);
  }
}
