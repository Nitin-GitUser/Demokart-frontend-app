import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../models/products';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Products;
  describe = true;

  constructor( private readonly route: ActivatedRoute, private productservice: ProductsService) { }


  ngOnInit(): void {
    const productid = this.route.snapshot.paramMap.get('productid');
    this.product = this.productservice.getProduct(Number(productid));
  }

}
