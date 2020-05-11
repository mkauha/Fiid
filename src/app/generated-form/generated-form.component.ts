import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { QuestionControlService } from '../question-control.service';
import { QuestionBase } from '../forms/question-base';
import { TextboxQuestion } from '../forms/question-textbox';
import { TextareaQuestion } from '../forms/question-textarea';
import { RadioQuestion } from '../forms/question-radio';

@Component({
  selector: 'app-generated-form',
  templateUrl: './generated-form.component.html',
  styleUrls: ['./generated-form.component.css']
})

export class GeneratedFormComponent implements OnInit {
  form: FormGroup;
  questions: QuestionBase[] = [];
  formTitle = ' ';

  constructor(private qcs: QuestionControlService) { }

  ngOnInit(): void {
    this.questions = this.qcs.getQuestions();
    this.formTitle = this.qcs.getFormTitle();
    this.form = this.qcs.getFormGroup();
  }

  generateTextForm() {
    this.formTitle = 'Test form';
    this.questions.push(new TextboxQuestion({questionID: 1, key: 'firstname', label: 'Firstname', textboxtype: 'string', required: true}));
    this.questions.push(new TextboxQuestion({questionID: 2, key: 'lastname', label: 'Lastname', textboxtype: 'string', required: true}));
    this.questions.push(new TextareaQuestion({questionID: 3, key: 'story', label: 'Story of your life', rows: 10, required: true}));
    this.questions.push(new RadioQuestion({questionID: 4, key: 'happiness', label: 'Happy?', optionAmount: 3, required: true}));
    this.form = this.generateTestFormGroup();
  }

  generateTestFormGroup(): FormGroup {
    const group: any = {};

    for (const question of this.questions) {
        if (question.required) {
            group[question.key] = new FormControl('', Validators.required);
        } else {
            group[question.key] = new FormControl();
        }
    }
    return new FormGroup(group);
}

}
