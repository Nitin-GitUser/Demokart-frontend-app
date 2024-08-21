// src/app/data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://0.0.0.0:5000/order'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    const data = this.http.get<any>(this.apiUrl);
    console.log(data)
    return data
  }
}
