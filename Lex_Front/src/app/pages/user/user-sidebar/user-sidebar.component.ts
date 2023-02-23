import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css'],
})
export class UserSidebarComponent implements OnInit {
  cid: any;
  category = [
    {
      cid: 0,
      title: '',
      description: '',
    },
  ];

  constructor(
    private categoryService: CategoryService,
    private route: Router ,
    private loginService : LoginService
  ) {}

  ngOnInit(): void {
    //loading category
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        this.category = data;
      },
      (error: any) => {
        Swal.fire('Error!!', 'Oops Error in loading Category', 'error');
      }
    );
  }
  allquiz() {
    this.route.navigate(['user/0']);
  }

  logout(){
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: "You won't be able to Log in again until you filled credentials",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Logout it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.loginService.logout();
        this.route.navigate(['/login']);
        swalWithBootstrapButtons.fire(
          'Logout Successfully!',
          'Logout',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelled',
          'You still Login in  :)',
          'error'
        )
      }
    })

  }
}
