import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {
  researches$: Object;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getResearches().subscribe(
      val => this.researches$ = val
    );
  }

}
