import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare var startSlider;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('bxslider')
  bxslider: ElementRef;

  constructor() { }

  ngOnInit() {
    startSlider();
  }
}
