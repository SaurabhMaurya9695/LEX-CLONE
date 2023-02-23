import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  category = {
    "title" : '',
    "description" : ''
  }

  constructor(private categoryService : CategoryService , private snackbar : MatSnackBar , private route: Router) { }

  ngOnInit(): void {
  }

  AddCat()
  {
      if(this.category.title.trim() == '' || this.category.title == null )
      {
          this.snackbar.open("Please fill the Title field" ,'ok' , {
            duration : 3000,
          })
      }
      else if(this.category.description == null || this.category.description.trim() == '')
      {
        this.snackbar.open("Please fill the description field" ,'ok' , {
          duration : 3000,
        })
        return ;
      }
      else if((this.category.description == null || this.category.description.trim() == '' ) && (this.category.title.trim() == '' || this.category.title == null ))
      {
        this.snackbar.open("Please fill all the fields" ,'ok' , {
          duration : 3000,
        })
        return ;
      }
      else{
        this.categoryService.addcategory(this.category).subscribe(
          (data:any)=>{
            Swal.fire("Successfully Added" , "Your category Has been added " , 'success');
            this.category.title='';
            this.category.description = '';
            this.route.navigate(['/admin/view-quizzes'])
            console.log(data);
          },
          (error)=>{
            Swal.fire("Error!!!!.." , "Due to some error can't added " , 'error');
            console.log(error);
          }
        );
      }
  }

}
