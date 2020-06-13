import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  empButton: string = "Create Employee";

  constructor(public empservice: EmployeeService, private fb: FormBuilder,
    private toastr: ToastrService,
    public diaLogRef: MatDialogRef<CreateEmployeeComponent>, @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.empButton = this.data.empButtonUpdate;
    }
  }


  submit() {
    if (!this.empservice.frmGroup.valid) {
      return;
    }
    this.empservice.CreateEmployee().subscribe(
      (res: any) => {
        if (res) {
          if (this.empservice.frmGroup.value.employeeID) {
            this.toastr.success('Employee record Updated!', 'Updated.');
          }
          else {
            this.toastr.success('New Employee created!', 'Registration successful.');
          }
          this.empservice.frmGroup.reset();
          this.onClose();
        } else {
          res.errors.forEach(element => {
            switch (element.code) {
              case 'DuplicateUserName':
                this.toastr.error('Username is already taken', 'Registration failed.');
                break;
              default:
                this.toastr.error(element.description, 'Registration failed.');
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
  onClose() {
    this.empservice.frmGroup.reset();
    this.diaLogRef.close()
  }

}
