import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from './users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usersData: Users[] = [
    {
      email: 'nagp@nagarro.com',
      password: 'nagp1234',
    },
    {
      email: 'nitin.goyal@nagarro.com',
      password: 'nagp2021',
    }
  ];
  user: Users;

  message: string;

  constructor(private readonly router: Router) {
    this.user = new Users();
  }

  verifyDetails(userForm: NgForm): void {
    const email = userForm.value.email;
    const password = userForm.value.password;

    const matchingUser: Users[] = this.usersData.filter(user =>
      user.email === email);

    if (matchingUser.length === 0) {
      this.message = 'This email is not registered';
    }
    else if (matchingUser[0].password === password) {
      localStorage.setItem('LoggedInUser', email);
      this.router.navigateByUrl('/');
    }
    else {
      this.message = 'Enter a valid password';
    }

  }

}
