import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit {

  public Editor = ClassicEditor;
  x : '' | undefined ;

  question = {
    content : " ",
    image : "",
    option1 :"",
    option2 :"",
    option3 :"",
    option4 :"",
    answer : "",
    quiz:{
        qid: "",
    }
};
  constructor(private questionService : QuestionsService , private activateRoute : ActivatedRoute
    ,private route : Router) { }

  ngOnInit(): void {
    // load all question details
    this.x = this.activateRoute.snapshot.params['quesId'];

    //load all questions filelds of this quizId;

    this.questionService.getOneQuestion(this.x).subscribe(
      (data:any)=>{
        this.question = data;
        console.log(this.question);

      },
      (error:any)=>{
        Swal.fire('Error!!!..' ,"Error in loading Question" , 'error');
      }
    );
    console.log(this.x);

  }

  UpdateQuestion(){
    Swal.fire({
      icon: 'info',
      title: 'Do You want to Update this question ?...',
      confirmButtonText: 'Update',
      denyButtonText: `Don't Update`,
      showCancelButton: true,
      showDenyButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.questionService.UpdateQuestion(this.question).subscribe(
          (data:any)=>{
            Swal.fire('Successfull' , 'Successfully Updated' , 'success');
            this.route.navigate(["/admin/view-quizzes"])

          },
          (error:any)=>{
            Swal.fire('Error!!..' , 'Some Error Ocuured' , 'error');
          }
        );
      }
      else if (result.isDenied) {
        Swal.fire('Changes are not updated', '', 'info');
      }
    });
    
  }

}
