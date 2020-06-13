import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { IUser } from 'src/app/shared/models/iuser';
import { ModalPopUp } from 'src/app/shared/models/modalpopup-model';

@Component({
  selector: 'app-studentlist',
  templateUrl: './studentlist.component.html',
  styleUrls: ['./studentlist.component.css']
})
export class StudentlistComponent implements OnInit {
public userDetails : IUser[]
public Apploading :boolean =false;
public isAdministrator :boolean =true;
public selectedAll : boolean =false;
public filteredstudentList: IUser[] = [];
@Input() popupModel : ModalPopUp
private _searchStudent = '';

get searchStudent() {
  return this._searchStudent;
}
set searchStudent(value) {
  this._searchStudent = value;

  if (this._searchStudent) {
    this.filteredstudentList = this.getFilteredstudentList(this._searchStudent);
  }
  else {
    this.filteredstudentList = this.userDetails;
  }
  this.selectedAll = this.filteredstudentList
  && this.filteredstudentList.length > 0 && this.filteredstudentList.every(activity => activity.isSelected === true);
}
  constructor(private service : UsersService) { }

  ngOnInit(): void {
    this.service.getUserProfile().subscribe((res: any) => {
      if (res) {
        this.userDetails = res;
      this.filteredstudentList=this.userDetails
      this.popupModel = new ModalPopUp();
      this.popupModel.message = "Student Updated Successfully";
      this.popupModel.data=
      //console.log(this.Usersatausd);
      this.Apploading=true;
        //this.toastr.success('Data Retrieved!', 'Successful.');
      }
    },
      err => {
        console.log(err);
      }
    );
  }

  SelectAll(isChecked : boolean){
    this.filteredstudentList.forEach((item) => item.isSelected = isChecked);
    this.selectedAll = this.filteredstudentList.every(activity => activity.isSelected === true);
  }

  CheckAllSelected(){
    this.selectedAll = this.filteredstudentList.every(activity => activity.isSelected === true);


  }

  private getFilteredstudentList(searchTerm: string): IUser[] {
    searchTerm = searchTerm.toLowerCase();
    return this.userDetails.filter((activity: IUser) =>
    activity.email.toLowerCase().indexOf(searchTerm) !== -1);
  }

}
