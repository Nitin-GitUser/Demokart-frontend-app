// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://OrderServiceLoadBalancer-1287903968.us-east-1.elb.amazonaws.com/order'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getData(orderId: string): Observable<any> {
    const params = new HttpParams().set('orderId', orderId);
    return this.http.get<any>(this.apiUrl, { params });
  }
}
