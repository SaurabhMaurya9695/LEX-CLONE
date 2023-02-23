import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.css'],
})
export class UpdateQuizComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private quizService: QuizService ,
    private route : Router
  ) {}

  x = 0;
  category = [
    {
      cid: '',
      title: '',
      description: '',
    },
  ];
  quizData = {
    title: '',
    description: '',
    active: false,
    maxMarks: '',
    noOfQuestions: '',
    category: {
      cid: '',
    },
  };
  ngOnInit(): void {
    this.x = this.activatedRoute.snapshot.params['qid'];
    this.quizService.getSingleQuiz(this.x).subscribe(
      (data: any) => {
        this.quizData = data;
        // console.log(data);
      },
      (error: any) => {
        console.log('not found');
      }
    );
    this.quizService.LoadCategories().subscribe(
      (data: any) => {
        this.category = data;
      },
      (error: any) => {
        Swal.fire('Error!!!', 'Error in loading category', 'error');
      }
    );
  }

  updateQuiz() {
    // console.log(this.quizData);
    Swal.fire({
      icon: 'info',
      title: 'Are you Wanted to Update Quiz ?',
      confirmButtonText: 'ok',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.quizService.updateQuiz(this.quizData).subscribe(
          (data: any) => {
            Swal.fire(
              'successfully',
              'SuccessFully Updated the Quiz',
              'success'
            );
            this.route.navigate(['/admin/view-quizzes']);
          },
          (error: any) => {
            Swal.fire('Error!!', 'Oops Some error occured', 'error');
          }
        );
      }
    });
  }
}
