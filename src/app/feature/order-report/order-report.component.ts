import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { IOrders } from 'src/app/shared/models/iorders';
import { OrderServiceService } from 'src/app/shared/services/order-service.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { DialogService } from 'src/app/shared/services/dialog.service';


@Component({
  selector: 'app-order-report',
  templateUrl: './order-report.component.html',
  styleUrls: ['./order-report.component.css']
})
export class OrderReportComponent implements OnInit {
  locale: string = "en";
  Orderdetails: IOrders[];
  errormessage: string = null;
  constructor(public dialog: MatDialog, private fb: FormBuilder, private orders: OrderServiceService,
    private dialogservice: DialogService) { }

  ngOnInit(): void {
  }

  openDialog(field : string): void {
    this.dialogservice.openAlertDialog('Please Provide ' + field )
 .afterClosed().subscribe(result => {
      this.errormessage = result;
    });
  }

  formModel = this.fb.group({
    StartDate: ['', Validators.required],
    EndDate: ['', Validators.required],
    ReportName: ['', Validators.required]

  });

  isFieldValid(field: string) {
    return !this.formModel.get(field).valid && this.formModel.get(field).touched;
  }

  submit() {
    if (!this.formModel.value.StartDate) {
      this.openDialog('StartDate');
      return;
    }
    if (!this.formModel.value.EndDate) {
      this.openDialog("EndDate");
      return;
    }
    if (!this.formModel.value.ReportName) {
      this.openDialog("ReportName");
      return;
    }

    if (!this.formModel.valid) {
      return;
    }
    var body = {
      StartDate: formatDate(this.formModel.value.StartDate, 'dd/MM/yyyy', this.locale),
      EndDate: formatDate(this.formModel.value.EndDate, 'dd/MM/yyyy', this.locale),
      ReportName: this.formModel.value.ReportName,
    };


    this.orders.getOrderReport(body).subscribe((res: any) => {
      if (res) {
        this.Orderdetails = res;
        this.GenerateCSVData();
        //this.toastr.success('Data Retrieved!', 'Successful.');
      }
    },
      err => {
        console.log(err);
      }
    );
  }

  GenerateCSVData() {
    let blob = new Blob(['\ufeff' + this.Orderdetails], {
      type: 'text/csv;charset=utf-8;'
    });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1;
    navigator.userAgent.indexOf('Chrome') == -1;

    //if Safari open in new window to save file with random filename. 
    if (isSafariBrowser) {
      dwldLink.setAttribute("target", "_blank");
    }
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", this.formModel.value.ReportName + ".csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
  }

  onHandleError() {
    this.errormessage = null;
  }

}
