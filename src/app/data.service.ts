import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) { }

  getNews() {
    return this.http.get<NewsInAYear[]>('/data/news.json');
  }

  getResearches() {
    return this.http.get<ResearchData>('/data/research.json');
  }
}
