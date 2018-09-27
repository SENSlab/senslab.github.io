import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import * as CryptoJS from 'crypto-js';

export class Publication {
  title: string;
  detail: string;
}

export class PubInAYear {
  year: string;
  contents: Publication[];
}

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit {
  searchText: String;
  awards: PubInAYear[]; showingAwards: PubInAYear[]; awardsAreLeft: Boolean;
  journals: PubInAYear[]; showingJournals: PubInAYear[]; journalsAreLeft: Boolean;
  internationalConfs: PubInAYear[]; showingInternationalConfs: PubInAYear[]; internationalConfsAreLeft: Boolean;
  domesticConfs: PubInAYear[]; showingDomesticConfs: PubInAYear[]; domesticConfsAreLeft: Boolean;
  surveys: PubInAYear[]; showingSurveys: PubInAYear[]; surveysAreLeft: Boolean;
  presses: PubInAYear[]; showingPresses: PubInAYear[]; pressesAreLeft: Boolean;
  books: PubInAYear[]; showingBooks: PubInAYear[]; booksAreLeft: Boolean;

  constructor(private data: DataService) { }

  ngOnInit() {
    const API_KEY = '7608320d524b25604efc37615685dd39,747afd9accb8009d9b4c0b36e1025be8,WcVLMQSvjnQEh3AgcZIX5rEZLg7OcZwxE2e2x72QBLKU5OPS+Ib5G8FLtWA73U7Z';
    const SPREADSHEET_ID = 'f56e081e2d85834f6220284b872ab154,b32208d1bc079220407f8da3e2cb3c4f,IHzTJc99UN056JQ01lSdI0u6kj0scQQHngJ0T+FPMNq9qT2waHYB5Mi9nNyG+u1v';
    const PASS = 'sens';

    let apikey = this.decrypt(API_KEY, PASS);
    let id = this.decrypt(SPREADSHEET_ID, PASS);

    this.data.getAwards(id, apikey).subscribe(
      res => { this.awards = this.format2PubInAYear(res); this.showingAwards = []; this.showPrevAwards(); }
    );
    this.data.getJournals(id, apikey).subscribe(
      res => { this.journals = this.format2PubInAYear(res); this.showingJournals = []; this.showPrevJournals(); }
    );
    this.data.getInternationalConfs(id, apikey).subscribe(
      res => { this.internationalConfs = this.format2PubInAYear(res); this.showingInternationalConfs = []; this.showPrevInternationalConfs(); }
    );
    this.data.getDomesticConfs(id, apikey).subscribe(
      res => { this.domesticConfs = this.format2PubInAYear(res); this.showingDomesticConfs = []; this.showPrevDomesticConfs(); }
    );
    this.data.getSurveys(id, apikey).subscribe(
      res => { this.surveys = this.format2PubInAYear(res); this.showingSurveys = []; this.showPrevSurveys(); }
    );
    this.data.getPresses(id, apikey).subscribe(
      res => { this.presses = this.format2PubInAYear(res); this.showingPresses = []; this.showPrevPresses(); }
    );
    this.data.getBooks(id, apikey).subscribe(
      res => { this.books = this.format2PubInAYear(res); this.showingBooks = []; this.showPrevBooks(); }
    );
  }

  decrypt(encryptedData: string, pass: string) {
    let rawData = encryptedData.split(',');
    let salt = CryptoJS.enc.Hex.parse(rawData[0]);
    let iv = CryptoJS.enc.Hex.parse(rawData[1]);
    let encrypted_data = CryptoJS.enc.Base64.parse(rawData[2]);

    let secret_passphorase = CryptoJS.enc.Utf8.parse(pass);
    let key128Bits500Iterations = CryptoJS.PBKDF2(secret_passphorase, salt, { keySize: 128 / 8, iterations: 500 });
    let options = { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 };
    let decrypted = CryptoJS.AES.decrypt({ "ciphertext": encrypted_data } as CryptoJS.WordArray, key128Bits500Iterations, options);
    return decrypted.toString(CryptoJS.enc.Utf8)
  }

  format2PubInAYear(res: any) {
    let val: Array<string[]> = res.values;
    let pub: PubInAYear[] = [];
    let tmp: PubInAYear = undefined;
    val.shift(); //skip the header
    val.forEach(row => {
      if (row.length == 1) {
        if (tmp != undefined) pub.push(tmp);
        tmp = { year: row[0], contents: [] };
      } else {
        tmp.contents.push({ title: row[1], detail: row[2] });
      }
    });
    pub.push(tmp);
    return pub;
  }

  showPrevAwards() {
    this.showingAwards.push(this.awards[this.showingAwards.length]);
    this.awardsAreLeft = this.awards.length != this.showingAwards.length;
  }

  showPrevJournals() {
    this.showingJournals.push(this.journals[this.showingJournals.length]);
    this.journalsAreLeft = this.journals.length != this.showingJournals.length;
  }

  showPrevInternationalConfs() {
    this.showingInternationalConfs.push(this.internationalConfs[this.showingInternationalConfs.length]);
    this.internationalConfsAreLeft = this.internationalConfs.length != this.showingInternationalConfs.length;
  }

  showPrevDomesticConfs() {
    this.showingDomesticConfs.push(this.domesticConfs[this.showingDomesticConfs.length]);
    this.domesticConfsAreLeft = this.domesticConfs.length != this.showingDomesticConfs.length;
  }

  showPrevSurveys() {
    this.showingSurveys.push(this.surveys[this.showingSurveys.length]);
    this.surveysAreLeft = this.surveys.length != this.showingSurveys.length;
  }

  showPrevPresses() {
    this.showingPresses.push(this.presses[this.showingPresses.length]);
    this.pressesAreLeft = this.presses.length != this.showingPresses.length;
  }

  showPrevBooks() {
    this.showingBooks.push(this.books[this.showingBooks.length]);
    this.booksAreLeft = this.books.length != this.showingBooks.length;
  }

  clearQuery(){
    this.searchText = '';
  }
}
