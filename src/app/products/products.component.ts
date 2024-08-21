import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from '../models/products';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products: Products[];
  cartProducts: Products[] = [];
  cartProductsNo = this.cartProducts.length;

  filterInputPlaceholder = 'Search Painting Gallery';
  filterImage: string;
  filteredProducts: Products[];

  get filterimage(): string {
    return this.filterImage;
  }
  set filterimage(value: string) {
    this.filterImage = value;
    this.filteredProducts = this.filterImage ? this.updateFilter(this.filterImage) : this.products;
  }
  updateFilter(filterBy: string): Products[] {
    filterBy = filterBy.toLowerCase();
    return this.products.filter(product =>
      product.name.toLowerCase().indexOf(filterBy) !== -1);
  }

  redirectCart(): void {
    this.router.navigateByUrl(`/cart`);
  }

  constructor(private productservice: ProductsService, private readonly router: Router ) {
    this.products = this.productservice.getProducts();
    this.filteredProducts = this.products;
  }

  ngOnInit(): void {
    const cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
      this.cartProducts = JSON.parse(cartItems);
      this.cartProductsNo = this.cartProducts.length;
    }
  }

}
