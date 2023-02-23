import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css'],
})
export class InstructionsComponent implements OnInit {
  qid: any;
  MM: number = 0;
  Q: number = 0;
  checked: boolean = false;

  quizzes = {
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
  };
  constructor(
    private activeRoute: ActivatedRoute,
    private quizService: QuizService,
    private matSnackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((e) => {
      this.qid = e['qid'];

      this.quizService.getSingleQuiz(this.qid).subscribe(
        (data: any) => {
          this.quizzes = data;
          this.MM = parseInt(this.quizzes.maxMarks);
          this.Q = parseInt(this.quizzes.noOfQuestions);
        },
        (error: any) => {
          console.log(error);
        }
      );
    });
  }

  StartQuiz(id: any) {
    if (this.checked == true) {
      Swal.fire({
        icon: 'info',
        title: 'Do You want to Start the Quiz ?...',
        confirmButtonText: 'Start',
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate([`start/${id}`]);
        }
      });
    } else {
      this.matSnackBar.open(
        'Please Click On the Checkbox if you read all the Instruction Carefully',
        'ok',
        {
          duration: 3000,
        }
      );
    }
  }
}
