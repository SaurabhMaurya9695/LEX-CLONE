import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import baseurl from 'src/app/services/helper';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private userService: UserService, private snack: MatSnackBar , private router :Router) {}

  // you can also make interface of this and use
  public user = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
  };
  formsubmit() {
    // console.log(this.user);
    if (
      this.user.username == '' ||
      this.user.username == null ||
      this.user.email == '' ||
      this.user.email == null ||
      this.user.firstname == '' ||
      this.user.firstname == null ||
      this.user.lastname == '' ||
      this.user.lastname == null ||
      this.user.password == '' ||
      this.user.password == null
    ) {
      // alert('Username is required!!');
      console.log('reuired username');
      this.snack.open('Some Fileds is Empty', 'ok', {
        duration: 3000,
      });
      return;
    }
    //if everything is correct the call adduser from Adduser()
    else {
      // console.log("inside this" + `${baseurl}/user/`);
      console.log(this.user);
      this.userService.addUser(this.user).subscribe(
        //writing two method which can execute on success and next one is running on error;
        (data: any) => {
          //success
          Swal.fire(
            'User is Created Now You Login!!!...',
            'User Id is ' + data.id,
            'success'
          );
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 3000);
        },
        (error) => {
          //error
          console.log(' Nhi chala');
          // this.snack.open('Something went Wrong!!', 'ok', {
          //   duration: 3000,
          // });
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>',
          });
        }
      );
    }
  }
  ngOnInit(): void {
    // this.formsubmit();
  }
}
