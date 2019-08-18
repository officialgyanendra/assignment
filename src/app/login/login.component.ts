import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required]);
    credError: boolean = false;
    credErrorMsg: string = '';

    constructor(private router: Router) { }
    getEmailErrorMessage() {
        return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' : '';
    }

    getPasswordErrorMessage() {
        return this.password.hasError('required') ? 'You must enter a value' : '';
    }

    login() {
        
        if (this.email.status == "INVALID" || this.password.status == "INVALID") {
            return false;
        } else {
            let email = this.email.value;
            let password = this.password.value;
            if (email == "admin@user.com" && password == "123456") {
                this.credError = false;
                this.credErrorMsg = "";

                let user = { email, password }
                localStorage.setItem('user', JSON.stringify(user));
                this.router.navigate(["home"]);
            } else {
                this.credError = true;
                this.credErrorMsg = "Invalid Credentials";
                setTimeout(() => {
                    this.credError = false;
                    this.credErrorMsg = "";
                }, 2000);
            }
        }
    }
}