import { Injectable } from '@angular/core';
import { Products } from './models/products';
import * as productsList from '../assets/templates/products.json';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  private productList: Products[] = (productsList as any).default;


  public getProducts(): Products[] {
    return this.productList;
  }

  public getProduct(productId: number): Products {
    const matchingProduct: Products[] = this.productList.filter( product =>
      product.id === productId);
    return matchingProduct[0];
  }

}
