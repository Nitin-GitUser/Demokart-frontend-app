import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Products } from '../models/products';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      imports: [
        RouterTestingModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    localStorage.clear();
  });

  it('should return cart exist true if cart has value', () => {
    localStorage.setItem('cartItems', JSON.stringify([{
      id: 4,
      name: 'Monalisa by Leonardo',
      price: 15000,
      description: 'Monalisa painting by Leonardo da vinci',
      category: 'Texture',
      quantity: 20,
      tag: 'Retail',
      image: 'monalisa.jpg',
      orderQuantity: 3
    }]));
    component.ngOnInit();
    expect(component.checkCartExists()).toEqual(true);
  });

  it('should cart exist false if cart has no value', () => {
    localStorage.setItem('cartItems', JSON.stringify([]));
    component.ngOnInit();
    expect(component.checkCartExists()).toEqual(false);
  });

});
