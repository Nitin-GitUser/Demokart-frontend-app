import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import * as productsList from '../assets/templates/products.json';
import { Products } from './models/products';


describe('ProductsService', () => {
  let service: ProductsService;
  const productList: Products[] = (productsList as any).default;


  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all Products', () => {
    expect(service.getProducts()).toEqual(productList);
  });

  it('should get selected product', () => {
    expect(service.getProduct(2)).toEqual({
      id: 2,
      name: 'Sky View',
      price: 500,
      painter: 'Vincent Van Gogh',
      description: 'Natural blue sky digital painting',
      category: 'Digital',
      quantity: 10,
      tag: 'Retail',
      image: 'digital.jpg'
  });
  });

});
