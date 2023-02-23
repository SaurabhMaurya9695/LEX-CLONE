import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user:any = null;
  constructor(private loginservice : LoginService) { }

  ngOnInit(): void {
     this.loginservice.getCurrenrUser().subscribe(
      (body):any=>{
        this.user= body;
      },
      (error)=>{
        console.log("UserNotFound");
      }
     );
  }

}
