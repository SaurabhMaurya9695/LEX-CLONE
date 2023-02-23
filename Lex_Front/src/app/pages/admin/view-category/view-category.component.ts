import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.css'],
})
export class ViewCategoryComponent implements OnInit {
  category = [
    {
      cid: 0,
      title: '',
      description: '',
    }
  ];

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(
      (data: any) => {
        this.category = data;
        // console.log(this.category);
      },
      (error) => {
        console.log(error);
        Swal.fire("Error!!" , "Error Occured in Loading " ,  "error");
      }
    );
  }

  DeleteQuiz(val:number) {
    // console.log(val);
    this.categoryService.delete(val).subscribe(
      (data:any)=>{
        this.category = this.category.filter((e) => e.cid != val);
        Swal.fire('Successfully Deleted' , `your category ${val} has been deleted` , 'success');
      },
      (error)=>{
        Swal.fire('Error' , `Error Occurred!!` , 'error');
      }
    );
  }
}
