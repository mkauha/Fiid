import { Component, OnInit } from '@angular/core';
import { QuestionBase } from '../forms/question-base';
import { QuestionControlService } from '../question-control.service';
import { FormGroup } from '@angular/forms';
import { TextboxQuestion } from '../forms/question-textbox';
import { RadioQuestion } from '../forms/question-radio';
import { TextareaQuestion } from '../forms/question-textarea';
import { PreviewFormComponent } from '../preview-form/preview-form.component';

@Component({
  selector: 'app-formbuilder',
  templateUrl: './formbuilder.component.html',
  styleUrls: ['./formbuilder.component.css']
})
export class FormbuilderComponent implements OnInit {

  public questions: QuestionBase[] = [];
  public form: FormGroup;

  public formTitle = '';
  public showAddButtons = false;
  public showFormQuestionInput = false;
  public addButtonStatus = 'success';
  public addButtonIcon = 'plus';
  public addButtonName = 'Add';

  public questionType: QuestionType;

  public questionID = 0;
  public questionKey = '';
  public questionLabel = '';
  public radioChoices = ['Bad', 'Neutral', 'Great'];
  public questionisRequired = false;

  private baseButtonStatus = 'basic';
  public selectedInputStatus = 'basic';
  public textboxButtonStatus = 'primary';
  public textareaButtonStatus = 'info';
  public radioButtonStatus = 'warning';

  constructor(private qcs: QuestionControlService) {
  }

  ngOnInit(): void {

  }

  toggleAdd() {
    this.showAddButtons = !this.showAddButtons;
    if (this.showAddButtons) {
        this.addButtonName = 'Cancel';
        this.addButtonIcon = 'close';
        this.addButtonStatus = 'danger';
    } else {
      this.addButtonName = 'Add';
      this.addButtonIcon = 'plus';
      this.addButtonStatus = 'success';
    }
  }

  toggleFormQuestionInput() {
    this.showFormQuestionInput = !this.showFormQuestionInput;
  }

  onAddElement() {
    this.reset();
    this.toggleAdd();
    if (this.showFormQuestionInput) {
      this.toggleFormQuestionInput();
    }
  }

  onAddTextBoxElement() {
    this.reset();
    this.questionType = QuestionType.Textbox;
    this.selectedInputStatus = this.textboxButtonStatus;
    this.textareaButtonStatus = this.baseButtonStatus;
    this.radioButtonStatus = this.baseButtonStatus;
    if (!this.showFormQuestionInput) {
      this.toggleFormQuestionInput();
    }
  }

  onAddTextAreaElement() {
    this.reset();
    this.questionType = QuestionType.Textarea;
    this.selectedInputStatus = this.textareaButtonStatus;
    this.textboxButtonStatus = this.baseButtonStatus;
    this.radioButtonStatus = this.baseButtonStatus;
    if (!this.showFormQuestionInput) {
      this.toggleFormQuestionInput();
    }
  }

  onAddRadioElement() {
    this.reset();
    this.questionType = QuestionType.Radio;
    this.selectedInputStatus = this.radioButtonStatus;
    this.textareaButtonStatus = this.baseButtonStatus;
    this.textboxButtonStatus = this.baseButtonStatus;
    if (!this.showFormQuestionInput) {
      this.toggleFormQuestionInput();
    }
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

    this.reset();
    this.toggleFormQuestionInput();
    this.toggleAdd();
    this.qcs.saveQuestions(this.formTitle, this.questions);
    this.form = this.qcs.getFormGroup();
  }

  reset() {
    this.questionKey = '';
    this.questionLabel = '';
    this.questionisRequired = false;
    this.textboxButtonStatus = 'primary';
    this.textareaButtonStatus = 'info';
    this.radioButtonStatus = 'warning';
  }

  createTextbox() {
    this.questions.push(new TextboxQuestion({
      id: this.questionID++,
      key: this.questionLabel.toLowerCase(),
      label: this.questionLabel,
      // make textboxtype customizable
      textboxtype: 'string',
      required: this.questionisRequired}),
    );
  }

  createTextarea() {
    this.questions.push(new TextareaQuestion({
      id: this.questionID++,
      key: this.questionLabel.toLowerCase(),
      label: this.questionLabel,
      // make rows customizable
      rows: 10,
      required: this.questionisRequired}),
    );
  }

  createRadio() {
    this.questions.push(new RadioQuestion({
      id: this.questionID++,
      key: this.questionLabel.toLowerCase(),
      label: this.questionLabel,
      // make optionAmount customizable
      choiceAmount: this.radioChoices.length,
      choices: this.radioChoices,
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
    this.qcs.saveQuestions(this.formTitle, this.questions);
  }
}

enum QuestionType {
  Textbox,
  Textarea,
  Radio,
}
