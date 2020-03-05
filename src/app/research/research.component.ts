import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService, ResearchData } from '../data.service';

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.css'],
  encapsulation: ViewEncapsulation.None, // needed to apply css to innerhtml
})
export class ResearchComponent implements OnInit {
  searchText: String;
  researches: ResearchData[];

  constructor(private data: DataService) { }

  ngOnInit() {

    this.data.getResearches().subscribe(
	val => {this.researches = val}
    ); 
  }
  
  clearQuery(){
    this.searchText = '';
  }
  
}
