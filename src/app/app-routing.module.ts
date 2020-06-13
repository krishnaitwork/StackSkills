import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { RegisterUserComponent } from './user/register-user/register-user.component';
import { ReportsComponent } from './feature/reports/reports.component';
import { UsersComponent } from './feature/Users/Users.component';
import { EmployeeComponent } from './feature/employee/employee.component';
import { CreateEmployeeComponent } from './feature/employee/create-employee/create-employee.component';

const routes: Routes = [
  { path: '', redirectTo: '/user/login', pathMatch: 'full' },
  { path: 'user/registration', component: RegisterUserComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] },
  { path: 'feature', component: UsersComponent, canActivate: [AuthGuard] },
  { path: 'Employee', component: EmployeeComponent, canActivate: [AuthGuard] },
  { path: 'CreateEmployee', component: CreateEmployeeComponent, canActivate: [AuthGuard] },
  { path: '**', component: HomeComponent,canActivate: [AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
