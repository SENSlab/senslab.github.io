import { Component, OnInit } from '@angular/core';
import { DataService, Member, MemberData } from '../data.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {
  allMember: MemberData[]

  constructor(private data: DataService) { 
  }

  ngOnInit() {
    this.data.getMember().subscribe(
      val => this.allMember = val
    );
  }

}
