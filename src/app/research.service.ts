import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ResearchService {

  constructor(private http: HttpClient) { }

  getResearches() {
    return this.http.get('/data/research.json');
  }
}
