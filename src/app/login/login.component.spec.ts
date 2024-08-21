import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        RouterTestingModule,
        FormsModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.clear();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shoud set localstorage for correct user', () => {

    const testForm = {
      value: {
        email: 'nitin.goyal@nagarro.com',
        password: 'nagp2021'
      }
    } as NgForm;
    component.verifyDetails(testForm);

    const cachevalue = localStorage.getItem('LoggedInUser');

    expect(cachevalue).toEqual('nitin.goyal@nagarro.com');

  });

  it('shoud not set localstorage for unlisted user', () => {

    const testForm = {
      value: {
        email: 'abc@gmail.com',
        password: 'nagp2021'
      }
    } as NgForm;
    component.verifyDetails(testForm);

    const cachevalue = localStorage.getItem('LoggedInUser') ? localStorage.getItem('LoggedInUser') : null;

    expect(cachevalue).toEqual(null);

  });


});
