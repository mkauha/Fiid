import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionControlService } from '../question-control.service';
import { QuestionBase } from '../forms/question-base';

@Component({
  selector: 'app-generated-form',
  templateUrl: './generated-form.component.html',
  styleUrls: ['./generated-form.component.css']
})

export class GeneratedFormComponent implements OnInit {
  form: FormGroup;
  questions: QuestionBase[] = [];

  constructor(private qcs: QuestionControlService) { }

  ngOnInit(): void {
    this.questions = this.qcs.getQuestions();
    this.form = this.qcs.getFormGroup();
  }

}
