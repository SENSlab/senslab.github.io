import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ResearchComponent } from './research/research.component';

import { DataService } from './data.service';

import { HttpClientModule } from '@angular/common/http';
import { ContactusComponent } from './contactus/contactus.component';
import { ClassesComponent } from './classes/classes.component';
import { MemberComponent } from './member/member.component';
import { PublicationComponent } from './publication/publication.component';
import { HistoryComponent } from './history/history.component';
import { PublicationFilterPipe } from './publication-filter.pipe';
import { ResearchFilterPipe } from './research-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ResearchComponent,
    ContactusComponent,
    ClassesComponent,
    MemberComponent,
    PublicationComponent,
    HistoryComponent,
    PublicationFilterPipe,
	ResearchFilterPipe,
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
