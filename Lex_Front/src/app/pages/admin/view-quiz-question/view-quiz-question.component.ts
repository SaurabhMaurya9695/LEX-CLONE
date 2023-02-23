import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quiz-question',
  templateUrl: './view-quiz-question.component.html',
  styleUrls: ['./view-quiz-question.component.css']
})
export class ViewQuizQuestionComponent implements OnInit {

  qId:any = " ";
  qTitle:any = " ";

  question = [
    {
      quesId: '',
      content : '',
      image : '',
      option1 : '',
      option2 :'',
      option3 : '',
      option4 : '',
      answer : '',
    }
  ] ;
  constructor(private route:ActivatedRoute , private questionService : QuestionsService , 
    private matsnackBar : MatSnackBar) { }

  ngOnInit(): void {
    this.qId = this.route.snapshot.params['qid'];
    this.qTitle = this.route.snapshot.params['title'];
    // console.log(this.qId + this.qTitle);
    this.questionService.getQuestionById(this.qId).subscribe(
      (data:any)=>{
        // console.log("data is" , data);
        this.question = data;
        // console.log(this.question);
      },
      (error:any)=>{
        Swal.fire('Error!!' , "Error in loading Question From Backend" , 'error');
        console.log(error);
      }
    );
  }


  doDelete(val : any)
  {
    Swal.fire({
      icon: 'info',
      title: 'Are you Wanted to Delete the  Quiz ?',
      confirmButtonText: 'ok',
      showCancelButton: true,
    }).then((result) => 
    {
      if (result.isConfirmed){
        this.questionService.DeleteQuestion(val).subscribe(
          (data:any)=>{
            Swal.fire('Successfully ' , 'Successfully deleted' , 'success');
            this.question = this.question.filter((e) => (e.quesId != val ));
          },
          (error : any)=>{
            this.matsnackBar.open('Oops Some Error occured in deleting ' , 'OK' , {
              duration : 3000
            })
          }
        );
      }
    });
  }
}
