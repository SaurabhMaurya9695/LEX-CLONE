import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-load-quiz',
  templateUrl: './load-quiz.component.html',
  styleUrls: ['./load-quiz.component.css'],
})
export class LoadQuizComponent implements OnInit {
  x: any;
  quizzes = [
    {
      qid: '',
      title: '',
      description: '',
      active: false,
      maxMarks: '',
      noOfQuestions: '',
      category: {
        cid: '',
        title: '',
        description: '',
      },
    },
  ];
  constructor(
    private activeRoute: ActivatedRoute,
    private quizService: QuizService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.x = params['catId'];
      if (this.x == 0) {
        // load all the quiz
        this.quizService.getActiveQuizzes().subscribe(
          (data: any) => {
            this.quizzes = data;
          },
          (error: any) => {
            Swal.fire('Error!!', 'Data cannot loaded perfectly', 'error');
          }
        );
      }
      else{
        this.quizService.getAllActiveQuizBasedOnCategory(this.x).subscribe(
          (data:any)=>{
            this.quizzes = data;
          },
          (error:any)=>{
            Swal.fire('Error!!', 'Data cannot loaded perfectly', 'error');
          }
        );
      }
    });
  }
}
