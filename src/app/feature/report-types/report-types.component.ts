import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators ,NgForm} from '@angular/forms';

@Component({
  selector: 'app-report-types',
  templateUrl: './report-types.component.html',
  styleUrls: ['./report-types.component.css']
})
export class ReportTypesComponent implements OnInit {

  @ViewChild('frmReport') ReportType : any 
  @Output() OutPutParameter =  new EventEmitter<String>()
  constructor() { }
  reportTypes: any = ['Users Details', 'Order Details', 'Users Report', 'Order Report']
  
  form = new FormGroup({
    frmReport: new FormControl('', Validators.required)
  });
  
  get f(){
    return this.form.controls;
  }
  
  submit(){
   // send the data to parent component

    this.OutPutParameter.emit(this.form.value);

  }
  changeWebsite(e) {
   // send the data to parent component
    //this.OutPutParameter.emit(e);
  }
  
  ngOnInit(): void {
  }

}
