import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from 'src/app/shared/models/iuser';
import { UserStatus } from 'src/app/shared/models/user-status';
import { UsersService } from 'src/app/shared/services/users.service';
import { StudentlistComponent } from '../studentlist/studentlist.component';

@Component({
  selector: 'app-Users',
  templateUrl: './Users.component.html',
  styleUrls: ['./Users.component.css']
})
export class UsersComponent implements OnInit {

  public userDetails: IUser[];
  public filteredUserDetails: IUser[];
  public datav: any[] = ["Administrator", "User", "Student"];
  public Usersatausd: UserStatus = new UserStatus();
  status: Object;
  public Apploading: boolean = false;
  public IconLoading: boolean = false;
  constructor(private router: Router, private service: UsersService, private modalService: NgbModal) {

  }
  debugger;
  filterUsers(filterVal: any) {
    if (filterVal == "0")
      this.filteredUserDetails = this.userDetails;
    else
      this.filteredUserDetails = this.userDetails.filter((item) => item.role == filterVal);
  }
  open() {
    const modalRef = this.modalService.open(StudentlistComponent);
  }
  GetClass(): string {
    //console.log(this.status)
    if (this.status["id"] == 1)
      return "fa fa-superpowers";
    else
      return "fa fa-user-circle-o";
    // if (itemvalue=="Student")
    // return "fa fa-user-o"
  }

  ngOnInit(): void {
    this.service.getUserProfile().subscribe((res: any) => {
      if (res) {
        this.userDetails = res;
      this.filteredUserDetails = this.userDetails;
      this.Usersatausd.Assets = this.userDetails.map(a => a.userID)
      this.Usersatausd.Users = this.userDetails.map(a => a.userID)
      //console.log(this.Usersatausd);
      this.Apploading = true;
        //this.toastr.success('Data Retrieved!', 'Successful.');
      }
    },
      err => {
        console.log(err);
      }
    );

    this.service.getUserStatus(this.Usersatausd).subscribe(
      (res: any) => {
        this.status = res;
        this.IconLoading = true;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}




