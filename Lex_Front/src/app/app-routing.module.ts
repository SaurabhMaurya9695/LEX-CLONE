import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './pages/admin/add-category/add-category.component';
import { AddQuestionComponent } from './pages/admin/add-question/add-question.component';
import { AddQuizComponent } from './pages/admin/add-quiz/add-quiz.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { UpdateQuestionComponent } from './pages/admin/update-question/update-question.component';
import { UpdateQuizComponent } from './pages/admin/update-quiz/update-quiz.component';
import { ViewCategoryComponent } from './pages/admin/view-category/view-category.component';
import { ViewQuizQuestionComponent } from './pages/admin/view-quiz-question/view-quiz-question.component';
import { ViewQuizzesComponent } from './pages/admin/view-quizzes/view-quizzes.component';
import { WelcomeComponent } from './pages/admin/welcome/welcome.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { InstructionsComponent } from './pages/user/instructions/instructions.component';
import { LoadQuizComponent } from './pages/user/load-quiz/load-quiz.component';
import { StartComponent } from './pages/user/start/start.component';
import { UserDashboardComponent } from './pages/user/user-dashboard/user-dashboard.component';
import { AdminGuard } from './services/admin.guard';
import { NormalGuard } from './services/normal.guard';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent, // localhost:4200/
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: RegisterComponent, // localhost:4200/register
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent, // localhost:4200/login
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    // pathMatch: 'full', // we don't need now
    canActivate: [AdminGuard], // this protect the admin guard;
    children: [
      //loading all the admin component here
      {
        path: '', // welcome component
        component: ProfileComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'categories',
        component: ViewCategoryComponent,
      },
      {
        path: 'add-category',
        component: AddCategoryComponent,
      },
      {
        path: 'view-quizzes',
        component: ViewQuizzesComponent,
      },
      {
        path: 'add-quiz',
        component: AddQuizComponent,
      },
      {
        path : 'quiz/:qid',
        component : UpdateQuizComponent,
      },
      {
        path: 'view-questions/:qid/:title',
        component : ViewQuizQuestionComponent
      },
      {
        path: 'add-question/:qid/:title',
        component : AddQuestionComponent
      },
      {
        path : 'update-question/:quesId',
        component :UpdateQuestionComponent,
      },
      
      
    ],
  },
  {
    path: 'user',
    component: UserDashboardComponent,
    canActivate: [NormalGuard],
    children:[
      {
        path: ':catId',
        component :LoadQuizComponent
      },
      {
        path: 'instructions/:qid',
        component :InstructionsComponent
      },
      
    ]
  },
  {
    path : 'start/:qid',
    component :StartComponent,
    canActivate: [NormalGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
