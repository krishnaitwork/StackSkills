import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { MultiDataSet, Label, SingleDataSet, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { IUser } from 'src/app/shared/models/iuser';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
  doughnutChartLabels: Label[] //= ["BMW", "Ford", "Tesla"];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartType: ChartType = 'doughnut';

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public UsersData: IUser[];

  public ChartLabel: Label[]// =["Administrator", "User", "Student"]
  public ChartData: SingleDataSet //=[56,78,99]
  public pieChartType: ChartType = 'pie';
  public pieChartLegend: true;
  public pieChartPlugins = [];

  constructor(private userservice: UsersService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
  public dataloaded: boolean = false;
  ngOnInit(): void {
    this.userservice.getUserProfile().subscribe((users: any) => {
      if (users) {
        this.UsersData = users;

        //this.Arr=this.UsersData.filter((thing, i, arr) => arr.findIndex(t => t.role === thing.role) === );
        
        //Get the distinct value from the list
        this.doughnutChartLabels = [...new Set(this.UsersData.map(obj => obj.role))]
        
        this.ChartLabel = [...new Set(this.UsersData.map(obj => obj.role))]  
  
        const abc = [...new Set(this.UsersData.map(obj => obj))]
        const counts = {}
  
        //Get the count by Group with Particular Field
        this.UsersData.forEach((ele) => {
          counts[ele.role] = counts[ele.role] ? (counts[ele.role] += 1) : 1;
        });
        this.doughnutChartData = Object.values(counts)
        this.ChartData = Object.values(counts).map(x => x)
        this.dataloaded = true;
      }
    },
      err => {
        console.log(err);
      }
    );
  }

  getChartData() {



    // if(this.UsersData==null){return null}


    // this.ChartData= [
    //   [55, 25, 20]
    // ];
  }

}
