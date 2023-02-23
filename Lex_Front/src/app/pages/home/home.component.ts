import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router , private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginService.logout();
  }

  explore()
  {
    this.router.navigate(['/admin']);
  }

}
