import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/shared/services/users.service';


@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent implements OnInit {

  constructor(public service: UsersService, private toastr: ToastrService,private router :Router) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

  GetToken() {
    if (localStorage.getItem('token') == null) {
      return true;
    }
  }
  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res) {
          this.service.formModel.reset();
          this.toastr.success('New user created!', 'Registration successful.');
          this.router.navigate(['/user/login']);
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken','Registration failed.');
                break;

              default:
              this.toastr.error(element.description,'Registration failed.');
                break;
            }
          });
        }
      },
      err => {
        console.log(err);
      }
    );
  }


}
