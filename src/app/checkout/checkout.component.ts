import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CheckoutDetails } from './checkout';
import { DataService } from '../data.service';
import { v4 as uuidv4 } from 'uuid'; // Import UUID library

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutDetails: CheckoutDetails;
  checkoutValidation = false;
  data: any = null;
  error: string | null = null;
  orderId: string | null = null;

  constructor(private dataService: DataService) {
    this.checkoutDetails = new CheckoutDetails();
    this.orderId = uuidv4(); 
  }

  ngOnInit(): void {
  }

  onSubmit(checkoutForm: NgForm): void {
    this.checkoutValidation = true;
    localStorage.setItem('cartItems', JSON.stringify([]));
    this.dataService.getData(this.orderId).subscribe(
      response => {
        this.data = response;
        this.error = null;
      },
      err => {
        this.error = 'Failed to fetch data';
        this.data = null;
      }
    );
    console.log(this.data)
  }

}
