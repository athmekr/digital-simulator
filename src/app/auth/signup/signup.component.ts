import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  //selector: 'selector-name',
  templateUrl: 'signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  constructor() { }
  isLoading = false;

  ngOnInit() { }

  onSignup(form: NgForm) {
    console.log(form.value);
  }
}
