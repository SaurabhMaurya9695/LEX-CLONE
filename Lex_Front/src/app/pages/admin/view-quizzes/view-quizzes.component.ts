import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizzes',
  templateUrl: './view-quizzes.component.html',
  styleUrls: ['./view-quizzes.component.css'],
})
export class ViewQuizzesComponent implements OnInit {
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

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.getAllQuiz();
  }

  getAllQuiz() {
    this.quizService.getQuiz().subscribe(
      (data: any) => {
        this.quizzes = data;
        // console.log(this.quizzes);
      },
      (error: any) => {
        Swal.fire('Error!!', 'Data cannot loaded perfectly', 'error');
      }
    );
  }

  deleteQuiz(id: any) {
    Swal.fire({
      icon: 'info',
      title: 'Are you Wanted to delete ?',
      confirmButtonText: 'Delete',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.quizService.DeleteQuiz(id).subscribe(
          (data: any) => {
            this.quizzes = this.quizzes.filter((e) => e.qid != id);
          },
          (error: any) => {
            Swal.fire('Error!!', `Some Error Occured`, 'error');
          }
        );
      }
    });
  }

  UpdateQuiz(x :any)
  {
    console.log("chala");
  }
}
