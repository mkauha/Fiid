import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbButtonModule, NbInputModule, NbCheckboxModule, NbToggleModule, NbCardModule, NbRadioModule, NbListModule, NbTabsetModule, NbIconLibraries } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbIconModule } from '@nebular/theme';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { QuestionComponent } from './question/question.component';
import { QuestionControlService } from './question-control.service';
import { GeneratedFormComponent } from './generated-form/generated-form.component';
import { FormbuilderComponent } from './formbuilder/formbuilder.component';
import { HomeComponent } from './home/home.component';
import { PreviewFormComponent } from './preview-form/preview-form.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    GeneratedFormComponent,
    FormbuilderComponent,
    HomeComponent,
    PreviewFormComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    NoopAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    AppRoutingModule,
    NbButtonModule,
    NbInputModule,
    NbCheckboxModule,
    NbIconModule,
    NbToggleModule,
    NbCardModule,
    NbRadioModule,
    NbListModule,
    NbTabsetModule,
  ],
  providers: [QuestionControlService, NbIconLibraries],
  bootstrap: [AppComponent]
})
export class AppModule { }
