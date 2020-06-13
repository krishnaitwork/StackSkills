import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { EditUserProfileComponent } from '../edit-user-profile/edit-user-profile.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private router: Router,private modalService:NgbModal) { }

  ngOnInit(): void {
  }

  getProfileDetails(){
    const modalRef = this.modalService.open(UserProfileComponent);

  }

  editProfileDetails(){
    const modalRef = this.modalService.open(EditUserProfileComponent);

  }
  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

}
