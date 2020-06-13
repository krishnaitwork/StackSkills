
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../confirm/confirm.component';
import { AlertComponent } from '../alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg){
   return this.dialog.open(ConfirmComponent,{
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: "10px" },
      data :{
        message : msg
      }
    });
  }
  openAlertDialog(msg){
    return this.dialog.open(AlertComponent,{
       width: '390px',
       height:'170px',
       panelClass: 'confirm-dialog-container',
       disableClose: true,
       position: { top: "10px" },
       data :{
         message : msg
       }
     });
   }

  }



