import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { FormbuilderComponent } from './formbuilder/formbuilder.component';
import { GeneratedFormComponent } from './generated-form/generated-form.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new', component: FormbuilderComponent },
  { path: 'form', component: GeneratedFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
