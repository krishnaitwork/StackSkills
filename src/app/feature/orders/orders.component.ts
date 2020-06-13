import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { OrderServiceService } from 'src/app/shared/services/order-service.service';
import { IOrders } from 'src/app/shared/models/iorders';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  config: any;
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public Apploading: boolean = false;
  public labels: any = {
    previousLabel: '<--',
    nextLabel: '-->',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
  };
  constructor(private toastr: ToastrService, private orders: OrderServiceService) {


  }
  public Orderdetails: IOrders[]

  ngOnInit(): void {
    this.orders.getOrderDetails().subscribe((res: IOrders[]) => {
      if (res) {
        this.Orderdetails = res;
        this.config = {
          id: 'first',
          itemsPerPage: 10,
          currentPage: 1,
          totalItems: this.Orderdetails.length

        };
        this.Apploading = true;
        //this.toastr.success('Data Retrieved!', 'Successful.');
      }
    },
      err => {
        console.log(err);
      }
    );
  }

  Overlay(event) {
    var containerHieght: any = document.getElementById("ReportsData");
    var HeaderHieght: number = document.getElementById("Header").offsetHeight;
    var OverlayDesign: any = document.getElementById("overlay")

    OverlayDesign.style.height = containerHieght.offsetHeight - HeaderHieght + "px"
    OverlayDesign.style.left = event.srcElement.offsetLeft + 126 + "px";
    OverlayDesign.style.top = containerHieght.scrollTop  + HeaderHieght + "px"
    OverlayDesign.style.display = "inline"
  }

  removeOverlay() {
    document.getElementById("overlay").style.display = "none";
    return false;
  }

  pageChanged(event) {
    this.config.currentPage = event;
    console.log(event);
  }
  onPreview(e) {
    //Get the HTML of div
    var divToPrint = document.getElementById(e);
    const newWin = window.open("");
    newWin.document.write(divToPrint.outerHTML);
    newWin.print();
    newWin.close();
  }
}

