import { Component, OnInit } from '@angular/core';
import { DataService, MemberData } from '../data.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  members: MemberData[];
  alumni: MemberData[];
  showingAlumni: MemberData[];
  alumniIsLeft: boolean;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.data.getMembers().subscribe(val => this.members = val);
    this.data.getAlumni().subscribe(val => {
      this.alumni = val;
      this.showingAlumni = [];
      this.alumniIsLeft = this.alumni.length != 0;
    });
  }

  showPrevAlumni() {
    this.showingAlumni.push(this.alumni.shift());
    this.alumniIsLeft = this.alumni.length != 0;
  }
}
