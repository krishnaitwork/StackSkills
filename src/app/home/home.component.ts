import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/services/users.service';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/models/iuser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../feature/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public userDetails :IUser[];

  constructor(private router: Router, private service: UsersService,private modalService:NgbModal) { }
  public tokendata= localStorage.getItem('token');

  ngOnInit(): void {
    
  }
  open() {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.my_modal_title = 'I your title';
    modalRef.componentInstance.my_modal_content = Date.now().toLocaleString();
  }

}
