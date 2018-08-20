import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

export class News {
  date: String;
  content: String;
}

export class NewsInAYear {
  year: Number;
  topic: [News];
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
}
