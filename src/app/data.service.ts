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
    return this.http.get<NewsInAYear[]>('/data/news.json');
  }

  getResearches() {
    return this.http.get<ResearchData[]>('/data/research.json');
  }

  getMembers() {
    return this.http.get<MemberData[]>('/data/members.json');
  }

  getAlumni() {
    return this.http.get<MemberData[]>('/data/alumni.json');
  }

  getAwards(id: string, apikey: string) {
    return this.http.get('https://sheets.googleapis.com/v4/spreadsheets/' + id + '/values/Award!A1:C10000?key=' + apikey);
  }

  getJournals(id: string, apikey: string) {
    return this.http.get('https://sheets.googleapis.com/v4/spreadsheets/' + id + '/values/Journal!A1:B10000?key=' + apikey);
  }

  getInternationalConfs(id: string, apikey: string) {
    return this.http.get('https://sheets.googleapis.com/v4/spreadsheets/' + id + '/values/internationalconference!a1:b10000?key=' + apikey);
  }

  getDomesticConfs(id: string, apikey: string) {
    return this.http.get('https://sheets.googleapis.com/v4/spreadsheets/' + id + '/values/DomesticConference!A1:B10000?key=' + apikey);
  }

  getSurveys(id: string, apikey: string) {
    return this.http.get('https://sheets.googleapis.com/v4/spreadsheets/' + id + '/values/Survey!A1:B10000?key=' + apikey);
  }

  getPresses(id: string, apikey: string) {
    return this.http.get('https://sheets.googleapis.com/v4/spreadsheets/' + id + '/values/Press!A1:B10000?key=' + apikey)
  }

  getBooks(id: string, apikey: string) {
    return this.http.get('https://sheets.googleapis.com/v4/spreadsheets/' + id + '/values/Book!A1:B10000?key=' + apikey);
  }

  getHistory() {
    return this.http.get<HistoryData[]>('/data/history.json');
  }
}
