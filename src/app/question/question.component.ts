import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextboxQuestion } from '../forms/question-textbox';
import { QuestionBase } from '../forms/question-base';
import { Form } from '@angular/forms';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question;
  @Input() form: FormGroup;

  selectedOption: string;
  constructor() { }

  ngOnInit(): void {
    console.log(this.question);
  }

}
