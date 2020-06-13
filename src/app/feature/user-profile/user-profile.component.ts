import { Component, OnInit, Input } from '@angular/core';
import { ModalPopUp } from 'src/app/shared/models/modalpopup-model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @Input() popupModel : ModalPopUp

  constructor() { }

  ngOnInit(): void {
    this.popupModel = new ModalPopUp();
    this.popupModel.message = "Student Updated Successfully";
  }

  GetClass(): string {
    //console.log(this.status)
    if (1 == 1)
      return "fa fa-superpowers";
    else
      return "fa fa-user-circle-o";
    // if (itemvalue=="Student")
    // return "fa fa-user-o"
  }

}
