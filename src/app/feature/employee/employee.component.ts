import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { EmployeeService } from 'src/app/shared/services/employee.service';
import { EmployeeModel } from 'src/app/shared/models/employee-model';
import { ToastrService } from 'ngx-toastr';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  empDetails: EmployeeModel[];
  Apploading: boolean = false;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['employeeID', 'firstName', 'lastName', 'birthDate', 'city', 'country', 'phoneNo', 'role', 'actions'];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  errormessage: any;
  searchKey: string

  constructor(public dialog: MatDialog, private empService: EmployeeService,
    private toster: ToastrService, private dialogservice: DialogService,
    private notificationservice : NotificationService, private changedetectorref : ChangeDetectorRef) { }

  ngOnInit(): void {
    this.GetEmployeeDetails()
  }
GetEmployeeDetails(){
  this.empService.getEmployeeDetails().subscribe((res: EmployeeModel[]) => {
    if (res) {
      this.empDetails = res.map(
        employee => {
          return {
            employeeID: employee.employeeID,
            firstName: employee.firstName,
            lastName: employee.lastName,
            birthDate: employee.birthDate,
            city: employee.city,
            country: employee.country,
            phoneNo: employee.phoneNo,
            role: employee.role
          }
        }
      );
    }
    this.dataSource = new MatTableDataSource(this.empDetails)
    this.Apploading = true;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

  },
    err => {
      console.log(err);
    }
  );
}

  onDelete(row) {
    this.dialogservice.openConfirmDialog('Are you sure to delete this record ?')
      .afterClosed().subscribe((confirmdialog) => {
        console.log(confirmdialog)
        if (confirmdialog) {
          this.empService.deletEmployee(row.employeeID).subscribe((res) => {
            if (res) {
              this.empDetails = this.empDetails.filter(x => x.employeeID !== row.employeeID)
              this.dataSource = new MatTableDataSource(this.empDetails)
              this.dataSource.sort = this.sort;
              this.dataSource.paginator = this.paginator;
              this.notificationservice.warn('Employee Record Deleted!');
            }
          },
            err => {
              console.log(err);
            }
          )
        }
      }
      );
  }

  createEmplyee(): void {
    this.empService.frmGroup.reset();
    const matDialogCOnfig = new MatDialogConfig();
    matDialogCOnfig.disableClose = true;
    matDialogCOnfig.autoFocus = true;
    matDialogCOnfig.width = "38%";
    this.dialog.open(CreateEmployeeComponent, matDialogCOnfig)
    .afterClosed().subscribe(x=>{
      this.GetEmployeeDetails()
    });
  }
  onEdit(row): void {
    this.empService.populateformFields(row)
    const matDialogCOnfig = new MatDialogConfig();
    matDialogCOnfig.disableClose = true;
    matDialogCOnfig.autoFocus = true;
    matDialogCOnfig.width = "38%";
    matDialogCOnfig.data ={empButtonUpdate:"Update Employee"}
    this.dialog.open(CreateEmployeeComponent, matDialogCOnfig)
    .afterClosed().subscribe(x=>{
      this.GetEmployeeDetails()
    });
  }
  applyFilter() {
this.dataSource.filter=this.searchKey.trim().toLowerCase()
  }
  onSearchClear() {
    this.searchKey="";
    this.applyFilter();
  }
}
