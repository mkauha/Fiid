import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextboxQuestion } from '../forms/question-textbox';
import { QuestionBase } from '../forms/question-base';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-question',
  template: `
    <div [ngSwitch]="question.controlType" [formGroup]="form">
      <label>{{question.label}}</label>
      <input *ngSwitchCase="'textbox'" [type]="question.textboxtype" [formControlName]="question.key">

      <div *ngSwitchCase="'slider'">
        <input id="shoeSize" [type]="question.type" [min]="question.min" [max]="question.max" [formControlName]="question.key">
        <label shoeSize></label>
      </div>

    </div>
  `
  ,
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
