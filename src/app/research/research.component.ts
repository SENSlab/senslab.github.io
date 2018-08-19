import { Component, OnInit } from '@angular/core';
import { ResearchService } from '../research.service';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css']
})
export class ResearchComponent implements OnInit {
  researches$: Object;

  constructor(private service: ResearchService) { }

  ngOnInit() {
    this.service.getResearches().subscribe(
      data => this.researches$ = data
    );
  }

}
