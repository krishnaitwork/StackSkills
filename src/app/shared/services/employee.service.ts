import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../models/employee-model';
import { HttpClient } from '@angular/common/http'
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  //readonly BaseURI = 'http://stackskills.com/NextGenStackSkills/api';
  readonly BaseURI = 'http://krishnaawk-001-site1.itempurl.com/api';

  locale: string = "en";

  frmGroup = this.fb.group(
    {
      employeeID :[],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phoneNo: ['', Validators.required],
      role: ['', Validators.required]
    }
  )
  // frmGroup1=new FormGroup({
  //   employeeID: new FormControl (null),
  //   firstName: new FormControl ('', Validators.required),
  //   lastName: new FormControl ('', Validators.required),
  //   birthDate: new FormControl ('', Validators.required),
  //   city: new FormControl ('', Validators.required),
  //   country: new FormControl ('', Validators.required),
  //   phoneNo: new FormControl ('', Validators.required),
  //   role: new FormControl ('', Validators.required)
  // })
  populateformFields(row) {
    this.frmGroup.setValue(row);
  }

  constructor(private http: HttpClient, private fb: FormBuilder) { }

  getEmployeeDetails(): Observable<EmployeeModel[]> {
    return this.http.get<EmployeeModel[]>(this.BaseURI + '/Employee/GetEmployeeDetails');
  }

  CreateEmployee() {

    const Bdate = new Date(this.frmGroup.value.birthDate).toLocaleDateString(); 
    var body = {
      EmployeeID: this.frmGroup.value.employeeID, //==null ? 0:this.frmGroup.value.employeeID,
      FirstName: this.frmGroup.value.firstName,
      LastName: this.frmGroup.value.lastName,
      BirthDate: Bdate,
      City: this.frmGroup.value.city,
      Country: this.frmGroup.value.country,
      PhoneNo: this.frmGroup.value.phoneNo,
      Role: this.frmGroup.value.role
    }
    if (!body.EmployeeID) {
      delete body.EmployeeID
      console.log(body)

     return this.insertEMployee(body);
    }
    else {
    return  this.updateEMployee(body);
    }
  }
  insertEMployee(body) :Observable <EmployeeModel[]> {
    return this.http.post<EmployeeModel[]>(this.BaseURI + '/Employee/AddEmployee', body);

  }

  updateEMployee(body)  :Observable <EmployeeModel[]> {
    return this.http.put<EmployeeModel[]>(this.BaseURI + '/Employee/UpdateEmployee', body);
  }

  deletEmployee(id: number) {
    return this.http.delete<EmployeeModel[]>(this.BaseURI + '/Employee/DeleteEmployee' + '/' + id);
  }

}
