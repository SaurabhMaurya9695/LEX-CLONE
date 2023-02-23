import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import baseurl from './helper';

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  constructor(private http: HttpClient) {}

  //Get limited Question ->< for user / Test
  public getlimitedQuestion(qId: any) {
    return this.http.get(`${baseurl}/question/quiz/${qId}`);
  }
  //get Question of quiz by id -> admin can see your al question 
  public getQuestionById(qId: any) {
    return this.http.get(`${baseurl}/question/quiz/all/${qId}`);
  }

  //add question to backend
  public AddQuestion(data:any):Observable<any> {
    console.log(data);
    return this.http.post<any>(`${baseurl}/question/`, data);
  }

  //delete question
  public DeleteQuestion(id:any)
  { 
      return this.http.delete(`${baseurl}/question/${id}` , id);
  }

  //update QUestion
  public UpdateQuestion(Question:any)
  { 
      return this.http.put(`${baseurl}/question/` , Question);
  }

  //get only one question on the basis of its id ;
  public getOneQuestion(id : any):Observable<any>
  {
     return this.http.get<any>(`${baseurl}/question/${id}`);
  }
}
