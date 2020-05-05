import { Component, OnInit } from '@angular/core';
import { QuestionBase } from '../forms/question-base';
import { QuestionControlService } from '../question-control.service';
import { FormGroup } from '@angular/forms';
import { TextboxQuestion } from '../forms/question-textbox';
import { RadioQuestion } from '../forms/question-radio';
import { TextareaQuestion } from '../forms/question-textarea';

@Component({
  selector: 'app-formbuilder',
  templateUrl: './formbuilder.component.html',
  styleUrls: ['./formbuilder.component.css']
})
export class FormbuilderComponent implements OnInit {

  questions: QuestionBase[] = [];
  form: FormGroup;

  public showAddButtons: boolean = false;
  public showFormQuestionInput: boolean = false;
  public buttonName: String = 'Add';

  public questionType: QuestionType;

  public questionID = 0;
  public questionKey = '';
  public questionLabel = '';
  public questionisRequired = false;

  constructor(private qcs: QuestionControlService) {
  }

  ngOnInit(): void {

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
      questionID: this.questionID++,
      key: this.questionLabel.toLowerCase(),
      label: this.questionLabel,
      // make textboxtype customizable
      textboxtype: 'string',
      required: this.questionisRequired}),
    );
  }

  createTextarea() {
    this.questions.push(new TextareaQuestion({
      questionID: this.questionID++,
      key: this.questionLabel.toLowerCase(),
      label: this.questionLabel,
      // make rows customizable
      rows: 10,
      required: this.questionisRequired}),
    );
  }

  createRadio() {
    this.questions.push(new RadioQuestion({
      questionID: this.questionID++,
      key: this.questionLabel.toLowerCase(),
      label: this.questionLabel,
      // make optionAmount customizable
      optionAmount: 3,
      required: this.questionisRequired}),
    );
  }

  delete(question: QuestionBase) {
    let removalIndex = -1;
    for (let index = 0; index < this.questions.length; index++) {
      if (this.questions[index].id === question.id) {
        removalIndex = index;
      }
    }
    if (removalIndex !== -1) {
      this.questions.splice(removalIndex, 1);
    }
  }

  onClickGenerateForm() {
    this.qcs.saveQuestions(this.questions);
  }
}

enum QuestionType {
  Textbox,
  Textarea,
  Radio,
}
