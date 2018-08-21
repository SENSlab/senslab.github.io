import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

export class News {
  date: String;
  content: String;
}

export class NewsInAYear {
  year: Number;
  topic: News[];
}

export class ResearchData {
  photoPass: String;
  titleJP: String;
  titleEN: String;
  publication: String;
  abstract: String;
  link: String;
  collaboration: String;
}

export class Member {
  nameJP: String;
  nameEN: String;
  position: String;
  positionOther: String;
  link: String
  photoPass: String;
}

export class MemberData {
  attribute: String;
  people: Member[];
}

export class HistoryData {
  topic: String;
  date: String;
  content: String;
  genre: String;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private location: Location) { }

  getNews() {
    return this.http.get<NewsInAYear[]>(this.location.prepareExternalUrl('/data/news.json'));
  }

  getResearches() {
    return this.http.get<ResearchData>(this.location.prepareExternalUrl('/data/research.json'));
  }

  getMember() {
    return this.http.get<MemberData[]>(this.location.prepareExternalUrl('/data/member.json')); 
  }

  getHistory() {
    return this.http.get<HistoryData>(this.location.prepareExternalUrl('/data/history.json')); 
  }
}
