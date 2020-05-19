import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { FormbuilderComponent } from './formbuilder/formbuilder.component';
import { GeneratedFormComponent } from './generated-form/generated-form.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new', component: FormbuilderComponent },
  { path: 'form', component: GeneratedFormComponent },
  { path: 'results', component: ResultsComponent },
  { path: '*', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
