import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { StudentlistComponent } from '../studentlist/studentlist.component';

@Component({
  selector: 'app-hbutton',
  templateUrl: './hbutton.component.html',
  styleUrls: ['./hbutton.component.css']
})
export class HbuttonComponent implements OnInit {

  constructor(private modalService:NgbModal) { }

  ngOnInit(): void {
  }
  open() {
    const modalRef = this.modalService.open(StudentlistComponent,{size: 'lg'});
    modalRef.componentInstance.my_modal_title = 'I your title';
    modalRef.componentInstance.my_modal_content = Date.now().toLocaleString();
  }

}
