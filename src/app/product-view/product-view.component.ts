import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from '../models/products';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-view',
  templateUrl: './product-view.component.html',
  styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

  @Input() product: Products;
  @Input() describe: boolean;

  cartProducts: Products[] = [];


  constructor(
    private productservice: ProductsService,
    private readonly router: Router
    ) { }

  ngOnInit(): void {
  }

  redirectDetails( productId: number): void {
    this.router.navigateByUrl(`/products/details/${productId}`);
  }

  redirectCart( product: Products): void {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      this.cartProducts = JSON.parse(cartItems);
    }

    this.updateCart(product);

    localStorage.setItem('cartItems', JSON.stringify(this.cartProducts));

    this.router.navigateByUrl(`/cart`);
  }

  updateCart(product: Products): void {
    let updated = false;
    this.cartProducts.forEach(existingProduct => {
      if (existingProduct.id === product.id) {
        existingProduct.orderQuantity++;
        updated = true;
        return;
      }
    });
    if (updated === false) {
      product.orderQuantity = 1;
      this.cartProducts.push(product);
    }
  }


}

