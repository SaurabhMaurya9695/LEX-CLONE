import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginData = {
    username: '',
    password: '',
  };
  constructor(
    private snack: MatSnackBar,
    private loginService: LoginService,
    private router: Router
  ) {}
  clicked() {
    if (
      this.loginData.username.trim() == '' ||
      this.loginData.username == null
    ) {
      this.snack.open('Username', 'ok', {
        duration: 3000,
      });
      return;
    } else if (
      this.loginData.password.trim() == '' ||
      this.loginData.password == null
    ) {
      this.snack.open('Password is required', ' ', {
        duration: 3000,
      });
      return;
    } else {
      // console.log("chalgya");
      this.loginService.generateToken(this.loginData).subscribe(
        (data: any) => {
          // console.log('success');
          // console.log(data);

          //token generated
          this.loginService.loginUser(data.token); // user's token set to local storage ;
          this.loginService.getCurrenrUser().subscribe((data: any) => {
            // we have user's data now ;
            this.loginService.setUser(data); // save user to localStorage ;
            // console.log(data);
            //both user and token set to the localStorage -> then redirect Now;
            //redirect to admin if role is admin else to Normal User;
            if (this.loginService.getUserRole() == 'ADMIN') {
              //redirect to admin page ;
              // window.location.href = '/admin';
              this.router.navigate(['admin']);
            } else if (this.loginService.getUserRole() == 'NORMAL') {
              //redirect to userPage ;
              // window.location.href = '/user';
              this.router.navigate(['user/0']); // directly go to the all category pages ;
            } else {
              this.loginService.logout();
              location.reload();
            }
          });
        },
        (error) => {
          console.log(error);
          this.snack.open('Invalid Details', ' ', {
            duration: 3000,
          });
        }
      );
    }
  }
  ngOnInit(): void {}
}
