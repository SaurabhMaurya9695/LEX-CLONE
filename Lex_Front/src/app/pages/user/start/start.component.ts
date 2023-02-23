import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css'],
})
export class StartComponent implements OnInit {
  qid: any;

  marksGot: any = 0;
  correctAns: any = 0;
  attempted: any = 0;
  marksSingle: any = 0;
  isSubmit: boolean = false;
  timer: any;
  timerleft : boolean = true;

  question = [
    {
      quesId: '',
      content: '',
      image: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      answer: '',
      givenAns: '',
      quiz: {
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
    },
  ];
  constructor(
    private locationStragey: LocationStrategy,
    private activateRoute: ActivatedRoute,
    private questionService: QuestionsService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.qid = this.activateRoute.snapshot.params['qid'];
    this.loadQuestion();
    this.preventBackButton();
    this.timer = this.question.length * 2 * 60;
  }
  loadQuestion() {
    this.questionService.getlimitedQuestion(this.qid).subscribe(
      (data: any) => {
        // console.log(data);
        this.question = data;
        this.question.forEach((q) => {
          q['givenAns'] = '';
        });
        // console.log(this.question);
        this.startTimer();
      },
      (error: any) => {
        Swal.fire(
          'Error!!..',
          'Error in Loding Question From Backend',
          'error'
        );
      }
    );
  }

  preventBackButton() {
    history.pushState(null, 'null', location.href);
    this.locationStragey.onPopState(() => {
      history.pushState(null, 'null', location.href);
    });
  }
  // toggleFullScreen() {
  //   let elem = document.body;
  //   let methodToBeInvoked = elem.requestFullscreen ;
  //   if (methodToBeInvoked) methodToBeInvoked.call(elem);
  // }

  SubmitQuiz() {
    this.correctAns = 0;
    // console.log(this.question);
    Swal.fire({
      icon: 'info',
      title: 'Do You want to Submit the Quiz ?...',
      confirmButtonText: 'Yes',
      showDenyButton: true,
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.isSubmit = true;
        this.question.forEach((q) => {
          if (q.givenAns == q.answer) {
            this.correctAns += 1;
            this.marksSingle =
              parseInt(this.question[0].quiz.maxMarks) /
              parseInt(this.question[0].quiz.noOfQuestions);
            this.marksGot += this.marksSingle;
          }

          if (q.givenAns.trim() != '') {
            this.attempted++;
          }
        });
      }
      console.log('correct ans is ' + this.correctAns);
      console.log('max marks got' + this.marksGot);
      console.log('question Attempted' + this.attempted);
    });
  }

  gohome() {
    this.route.navigate(['user/0']);
  }

  startTimer() {
    let x = window.setInterval(() => {
      //code
      if (this.timer <= 0) {
        this.timerleft = true;
        this.isSubmit = true;
        this.question.forEach((q) => {
          if (q.givenAns == q.answer) {
            this.correctAns += 1;
            this.marksSingle =
              parseInt(this.question[0].quiz.maxMarks) /
              parseInt(this.question[0].quiz.noOfQuestions);
            this.marksGot += this.marksSingle;
          }

          if (q.givenAns.trim() != '') {
            this.attempted++;
          }
        });
        clearInterval(x);
      } else {
        this.timer--;
      }
    }, 1000);
  }

  getFormattedTime()
  {
    let mm = Math.floor(this.timer / 60);
    let ss = this.timer - mm * 60 ;
    return `${mm} : ${ss}`;
  }

  printPage(){
    window.print();
  }
}
