import { Component, OnInit ,Input} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPopUp } from 'src/app/shared/models/modalpopup-model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  
  @Input() my_modal_title;
  @Input() my_modal_content;
  @Input() modalPopupdata : ModalPopUp


  constructor(public activeModal : NgbActiveModal, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  public done() {
    if (this.modalPopupdata) {
      this.toastr.info(this.modalPopupdata.message);
      return;
    } else {
      this.activeModal.close('done');
    }
  }

}
