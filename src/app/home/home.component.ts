import { Component, OnInit } from '@angular/core';
import { DataService, News, NewsInAYear } from '../data.service';
declare var startSlider;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allNews: NewsInAYear[];
  showingNews: NewsInAYear[];
  newsIsLeft: Boolean;

  constructor(private data: DataService) {
    this.showingNews = [];
  }

  ngOnInit() {
    startSlider(); //defined in homeBxslider.js

    this.data.getNews().subscribe(
      val => {
        this.allNews = val;
        this.showPrevYearNews();
      }
    );
  }

  showPrevYearNews() {
    this.showingNews.push(this.allNews.shift());
    this.newsIsLeft = this.allNews.length != 0;
  }
}
