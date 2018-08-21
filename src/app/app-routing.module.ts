import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResearchComponent } from './research/research.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ClassesComponent } from './classes/classes.component';
import { MemberComponent } from './member/member.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'research', component: ResearchComponent },
  { path: 'contact', component: ContactusComponent },
  { path: 'classes', component: ClassesComponent },
  { path: 'member', component: MemberComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
