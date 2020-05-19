import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { QuestionComponent } from './question/question.component';
import { QuestionControlService } from './services/question-control.service';
import { GeneratedFormComponent } from './generated-form/generated-form.component';
import { FormbuilderComponent } from './formbuilder/formbuilder.component';
import { HomeComponent } from './home/home.component';
import { PreviewFormComponent } from './preview-form/preview-form.component';
import { HttpService } from './services/http.service';
import { ResultsComponent } from './results/results.component';
import { DivEmojiSelectComponent } from './div-emoji-select/div-emoji-select.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbIconModule } from '@nebular/theme';
import { NbThemeModule,
  NbLayoutModule,
  NbButtonModule,
  NbInputModule,
  NbCheckboxModule,
  NbToggleModule,
  NbCardModule,
  NbRadioModule,
  NbListModule,
  NbIconLibraries,
  NbAccordionModule,
  NbTooltipModule,
 } from '@nebular/theme';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    GeneratedFormComponent,
    FormbuilderComponent,
    HomeComponent,
    PreviewFormComponent,
    ResultsComponent,
    DivEmojiSelectComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
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
    NbAccordionModule,
    NbTooltipModule
  ],
  providers: [QuestionControlService, NbIconLibraries, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
