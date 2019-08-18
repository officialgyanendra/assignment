import { Component } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router) { }
  first_name = new FormControl('', [Validators.required]);
  last_name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  phone_number = new FormControl('', [Validators.required]);

  first_edit_name = new FormControl('', [Validators.required]);
  last_edit_name = new FormControl('', [Validators.required]);
  edit_email = new FormControl('', [Validators.required, Validators.email]);
  edit_phone_number = new FormControl('', [Validators.required]);
  searchText;

  showPopup:boolean = false;
  showEditPopup:boolean = false;
  editIndex:any = '';
  editItem: any;

  userData: any = [
    {
      first_name: "Gyanendra",
      last_name: "Kumar",
      email: "officialgyanendra@gmail.com",
      phone_number: "1234567890"    
    },
    {
      first_name: "Gyanendra",
      last_name: "Kumar",
      email: "officialgyanendra@gmail.com",
      phone_number: "1234567890"    
    }
  ];
  

  getFristNameErrorMessage() {
      return this.first_name.hasError('required') ? 'You must enter a value' : '';
  }
  getLastNameErrorMessage() {
    return this.last_name.hasError('required') ? 'You must enter a value' : '';
  }
  getEmailErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
    this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getPhoneErrorMessage() {
    return this.phone_number.hasError('required') ? 'You must enter a value' : '';
  }

  getFristEditNameErrorMessage() {
      return this.first_edit_name.hasError('required') ? 'You must enter a value' : '';
  }
  getLastEditNameErrorMessage() {
    return this.last_edit_name.hasError('required') ? 'You must enter a value' : '';
  }
  getEmailEditErrorMessage() {
    return this.edit_email.hasError('required') ? 'You must enter a value' :
    this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getPhoneEditErrorMessage() {
    return this.edit_phone_number.hasError('required') ? 'You must enter a value' : '';
  }

  openPopup() {
    this.showPopup = true;
  }
  closePopup() {
    this.showPopup = false;
  }

  openEditPopup() {
    this.showEditPopup = true;
  }
  closeEditPopup() {
    this.showEditPopup = false;
  }

  saveUser() {
    if (this.first_name.status == "INVALID" || this.last_name.status == "INVALID" || this.email.status == "INVALID" || this.phone_number.status == "INVALID") {
        return false;
    } else {
      let first_name = this.first_name.value;
      let last_name = this.last_name.value;
      let email = this.email.value;
      let phone_number = this.phone_number.value;
      let data = {first_name, last_name, email, phone_number};
      this.userData.push(data);
      this.showPopup = false;
    } 
  }

  updateUser() {
    if (this.first_edit_name.status == "INVALID" || this.last_edit_name.status == "INVALID" || this.edit_email.status == "INVALID" || this.edit_phone_number.status == "INVALID") {
        return false;
    } else {
      let first_name = this.first_edit_name.value;
      let last_name = this.last_edit_name.value;
      let email = this.edit_email.value;
      let phone_number = this.edit_phone_number.value;
      let data = {first_name, last_name, email, phone_number};
      this.userData[this.editIndex] = data;
      this.showEditPopup = false;
    }
  }

  editUser(item, index) {
    this.first_edit_name.setValue(item.first_name);
    this.last_edit_name.setValue(item.last_name);
    this.edit_email.setValue(item.email);
    this.edit_phone_number.setValue(item.phone_number);
    this.editIndex = index;
    this.editItem = item;
    this.showEditPopup = true;
  }
  deleteUser(item, index) {
    this.userData.splice(item, 1);
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(["login"]);
  }
}