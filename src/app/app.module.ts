import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import {UsersService} from './shared/services/users.service'
import { AuthInterceptor } from './auth/auth.interceptor';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserComponent } from './user/user.component';
import { ChartsModule } from 'ng2-charts';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalComponent } from './feature/modal/modal.component';
import { HbuttonComponent } from './feature/hbutton/hbutton.component';
import { StudentlistComponent } from './feature/studentlist/studentlist.component';
import { ReportsComponent } from './feature/reports/reports.component';
import { ReportTypesComponent } from './feature/report-types/report-types.component';
import { UsersComponent } from './feature/Users/Users.component';
import { PieChartComponent } from './feature/pie-chart/pie-chart.component';
import { RegisterUserComponent } from './user/register-user/register-user.component';
import { OrdersComponent } from './feature/orders/orders.component';
import { NavigationComponent } from './feature/navigation/navigation.component';
import { UserProfileComponent } from './feature/user-profile/user-profile.component';
import { EditUserProfileComponent } from './feature/edit-user-profile/edit-user-profile.component';
import { UserReportComponent } from './feature/user-report/user-report.component';
import { OrderReportComponent } from './feature/order-report/order-report.component';
import { AlertComponent } from './shared/alert/alert.component';
import { MaterialModule } from './material/material.module';
import { EmployeeComponent } from './feature/employee/employee.component';
import { CreateEmployeeComponent } from './feature/employee/create-employee/create-employee.component';
import { ConfirmComponent } from './shared/confirm/confirm.component';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ChartsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    FormsModule,ReactiveFormsModule,
    NgxPaginationModule

  ],
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent,
    PieChartComponent,
    ModalComponent,
    RegisterUserComponent,
    OrdersComponent,
    HbuttonComponent,
    StudentlistComponent,
    ReportsComponent,
    ReportTypesComponent,
    NavigationComponent,
    UserProfileComponent,
    EditUserProfileComponent,
    UserReportComponent,
    OrderReportComponent,
    AlertComponent,
    EmployeeComponent,
    CreateEmployeeComponent,
    ConfirmComponent
  ],
  providers: [UsersService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents: [AlertComponent,ConfirmComponent]

})
export class AppModule { }
