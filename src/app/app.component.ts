import { Component, OnInit } from '@angular/core';
import { QuestionBase } from './forms/question-base';
import { QuestionControlService } from './question-control.service';
import { FormGroup } from '@angular/forms';
import { TextboxQuestion } from './forms/question-textbox';
import { RadioQuestion } from './forms/question-radio';
import { TextareaQuestion } from './forms/question-textarea';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent {

  questions: QuestionBase[] = [];
  form: FormGroup;

  public showAddButtons: boolean = false;
  public showFormQuestionInput: boolean = false;
  public buttonName: String = 'Add';

  public questionType: QuestionType;

  public questionKey = '';
  public questionLabel = '';
  public isRequired = false;

  constructor(private qcs: QuestionControlService) {
  }

  toggleAdd() {
    this.showAddButtons = !this.showAddButtons;
    if (this.showAddButtons) {
        this.buttonName = 'Cancel';
    } else {
      this.buttonName = 'Add';
    }
  }

  toggleFormQuestionInput() {
    this.showFormQuestionInput = !this.showFormQuestionInput;
  }

  onAddElement() {
    this.toggleAdd();
    if (this.showFormQuestionInput) {
      this.toggleFormQuestionInput();
    }
  }

  onAddTextBoxElement() {
    this.questionType = QuestionType.Textbox;
    this.toggleFormQuestionInput();
  }

  onAddTextAreaElement() {
    this.questionType = QuestionType.Textarea;
    this.toggleFormQuestionInput();
  }

  onAddRadioElement() {
    this.questionType = QuestionType.Radio;
    this.toggleFormQuestionInput();
  }

  onSubmitQuestion() {
    switch (this.questionType) {
      case QuestionType.Textbox:
        this.createTextbox();
        break;
      case QuestionType.Textarea:
        this.createTextarea();
        break;
      case QuestionType.Radio:
        this.createRadio();
        break;
    }

    this.toggleFormQuestionInput();
    this.toggleAdd();
  }

  createTextbox() {
    this.questions.push(new TextboxQuestion({
      key: this.questionLabel.toLowerCase(),
      label: this.questionLabel,
      // make textboxtype customizable
      textboxtype: 'string',
      required: this.isRequired}),
    );
  }

  createTextarea() {
    this.questions.push(new TextareaQuestion({
      key: this.questionLabel.toLowerCase(),
      label: this.questionLabel,
      // make rows customizable
      rows: 10,
      required: this.isRequired}),
    );
  }

  createRadio() {
    this.questions.push(new RadioQuestion({
      key: this.questionLabel.toLowerCase(),
      label: this.questionLabel,
      // make optionAmount customizable
      optionAmount: 3,
      required: this.isRequired}),
    );
  }

  delete(question: Object) {

  }

  onClickGenerateForm() {
    // this.form = this.qcs.toFormGroup(this.questions);
    // route to next page
  }
}

enum QuestionType {
  Textbox,
  Textarea,
  Radio,
}
