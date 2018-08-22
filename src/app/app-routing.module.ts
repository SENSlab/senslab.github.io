import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResearchComponent } from './research/research.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ClassesComponent } from './classes/classes.component';
import { MemberComponent } from './member/member.component';
import { PublicationComponent } from './publication/publication.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'research', component: ResearchComponent },
  { path: 'publication', component: PublicationComponent },
  { path: 'contact', component: ContactusComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'member', component: MemberComponent },
  { path: 'history', component: HistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
