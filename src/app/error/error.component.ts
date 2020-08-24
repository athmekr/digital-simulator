import { Component, OnInit } from '@angular/core';

@Component({
  //selector: 'selector-name',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})

export class ErrorComponent implements OnInit {
  constructor() { }

  message = 'An unknown error occured';

  ngOnInit() { }
}