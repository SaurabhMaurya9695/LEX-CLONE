import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css'],
})
export class AddQuestionComponent implements OnInit {

  public Editor = ClassicEditor;
  qId: any;
  qTitle: any = '';
  //create a Empty Json for Quiz

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
  constructor(
    private route: ActivatedRoute,
    private questionService: QuestionsService,
    private matsnackbar: MatSnackBar,
    private navi : Router
  ) {}

  ngOnInit(): void {
    this.qId = this.route.snapshot.params['qid'];
    this.qTitle = this.route.snapshot.params['title'];
    this.question.quiz['qid'] = this.qId;
  }

  AddQuestion() {
    // console.log(this.question);
    // all fields should be filled then
    if (this.question.content.trim() == '' || this.question.content == null) {
      this.matsnackbar.open(`Can't leave content blank`, 'ok', {
        duration: 3000,
      });
      return;
    } else if (
      this.question.option1.trim() == '' ||
      this.question.option1 == null
    ) {
      this.matsnackbar.open(`Can't leave option1 blank`, 'ok', {
        duration: 3000,
      });
      return;
    } else if (
      this.question.option2.trim() == '' ||
      this.question.option2 == null
    ) {
      this.matsnackbar.open(`Can't leave option2 blank`, 'ok', {
        duration: 3000,
      });
      return;
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Do You want to add this question ?...',
        confirmButtonText: 'ok',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.questionService.AddQuestion(this.question).subscribe(
            (data: any) => {
              Swal.fire(
                'SuccessFull',
                'Question added Successfully',
                'success'
              );
              this.navi.navigate([`/admin/view-questions/${this.qId}/${this.qTitle}`]);
              console.log(data);
            },
            (error) => {
              Swal.fire('Error!!..', 'Error in posting Question...', 'error');
              console.log(error);
            }
          );
        }
      });
    }
  }
  reset() {
    this.question = {
      content: '',
      image: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: '',
      quiz: {
        qid: '',
      },
    };
    this.ngOnInit();
  }
}
