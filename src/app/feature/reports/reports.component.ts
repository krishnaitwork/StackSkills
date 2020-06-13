import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  reporttype : string

  childval : string
  constructor() { }

  ngOnInit(): void {
  }

  GetOutpuVal(e){
    //console.log('POutput',e)
    //console.log(e.target.value)
    Object.values(e);

    //this.reporttype=Object.values(e).toString();
   this.reporttype= e.frmReport
  }

}
