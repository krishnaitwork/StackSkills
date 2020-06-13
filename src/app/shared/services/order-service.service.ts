import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IOrders } from '../models/iorders';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {

  constructor(private http: HttpClient) { }
  // readonly BaseURI = 'http://stackskills.com/NextGenStackSkills/api';
  readonly BaseURI = 'http://krishnaawk-001-site1.itempurl.com/api';


  getOrderDetails() {
    return this.http.get<IOrders[]>(this.BaseURI + '/Order/GetOrderDetails');
  }

  getOrderReport(body:any){
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }), responseType: 'text' as 'json' };
    return this.http.post<any>(this.BaseURI + '/Order/ExportReport',body,httpOptions);
  }


}
