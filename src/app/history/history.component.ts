import { Component, OnInit } from '@angular/core';
import { DataService, HistoryData } from '../data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  historyData: HistoryData

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getHistory().subscribe(
      val => this.historyData = val
    );
  }

  scrollToTop() {
    window.scrollTo(0,0);
  }

}
