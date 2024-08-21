import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../models/products';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartProducts: Products[] = [];
  describe = false;
  cartamount = 0;

  get cartAmountIncludingVat(): number {
    return this.cartamount * 1.18;
  }

  get cartAmount(): number {
    let amount = 0;
    this.cartProducts.forEach(product => {
      amount = amount + product.orderQuantity * product.price;
    });
    this.cartamount = amount;
    return amount;
  }

  constructor(
    private readonly route: ActivatedRoute,
    private productservice: ProductsService,
    private readonly router: Router) {
  }


  ngOnInit(): void {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      this.cartProducts = JSON.parse(cartItems);
    }
  }


  deleteCart(product: Products): void {
    const index = this.cartProducts.indexOf(product);
    this.cartProducts.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(this.cartProducts));
  }

  addQuantity(product: Products): void {
    const index = this.cartProducts.indexOf(product);
    this.cartProducts[index].orderQuantity++;
    localStorage.setItem('cartItems', JSON.stringify(this.cartProducts));
  }

  reduceQuantity(product: Products): void {
    const index = this.cartProducts.indexOf(product);
    console.log(this.cartProducts[index]);
    const quantity = this.cartProducts[index].orderQuantity;
    if (quantity === 1) {
      this.deleteCart(product);
    }
    else {
      this.cartProducts[index].orderQuantity--;
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartProducts));
  }

  checkCartExists(): boolean {
    if (this.cartProducts.length === 0) {
      return false;
    }
    return true;
  }

  redirectCheckOut(): void {
    this.router.navigateByUrl('/checkout');
  }
}
