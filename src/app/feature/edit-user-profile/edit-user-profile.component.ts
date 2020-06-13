import { Component, OnInit, Input } from '@angular/core';
import { ModalPopUp } from 'src/app/shared/models/modalpopup-model';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.css']
})
export class EditUserProfileComponent implements OnInit {
  @Input() popupModel : ModalPopUp

  constructor() { }

  ngOnInit(): void {
    this.popupModel = new ModalPopUp();
    this.popupModel.message = "Student Updated Successfully";
  }

}
