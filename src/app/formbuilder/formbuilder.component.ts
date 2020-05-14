import { Component, OnInit } from '@angular/core';
import { QuestionBase } from '../forms/question-base';
import { QuestionControlService } from '../question-control.service';
import { FormGroup, NgForm } from '@angular/forms';
import { TextboxQuestion } from '../forms/question-textbox';
import { RadioQuestion } from '../forms/question-radio';
import { TextareaQuestion } from '../forms/question-textarea';
import { PreviewFormComponent } from '../preview-form/preview-form.component';
import { EmojiQuestion } from '../forms/question-emoji';

@Component({
  selector: 'app-formbuilder',
  templateUrl: './formbuilder.component.html',
  styleUrls: ['./formbuilder.component.css']
})
export class FormbuilderComponent implements OnInit {

  public questions: QuestionBase[] = [];
  public form: FormGroup;

  public allowGeneration = false;
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
  public questionisRequired = false;

  public showChoiceInput = false;
  public radioChoices = ['', '', ''];
  public choiceAmount = this.radioChoices.length;

  private baseButtonStatus = 'basic';
  public selectedInputStatus = 'basic';
  public textboxButtonStatus = 'primary';
  public textareaButtonStatus = 'info';
  public radioButtonStatus = 'success';
  public emojiButtonStatus = 'warning';

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
    this.emojiButtonStatus = this.baseButtonStatus;
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
    this.emojiButtonStatus = this.baseButtonStatus;
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
    this.emojiButtonStatus = this.baseButtonStatus;
    this.showChoiceInput = true;
    if (!this.showFormQuestionInput) {
      this.toggleFormQuestionInput();
    }
  }

  onAddEmojiElement() {
    this.reset();
    this.questionType = QuestionType.Emoji;
    this.selectedInputStatus = this.emojiButtonStatus;
    this.textareaButtonStatus = this.baseButtonStatus;
    this.textboxButtonStatus = this.baseButtonStatus;
    this.radioButtonStatus = this.baseButtonStatus;
    if (!this.showFormQuestionInput) {
      this.toggleFormQuestionInput();
    }
  }

  onSubmitQuestion(f: NgForm) {
    switch (this.questionType) {
      case QuestionType.Textbox:
        this.createTextbox();
        break;
      case QuestionType.Textarea:
        this.createTextarea();
        break;
      case QuestionType.Radio:
        this.createRadio(f);
        break;
      case QuestionType.Emoji:
        this.createEmoji();
        break;
    }

    this.reset();
    this.toggleFormQuestionInput();
    this.toggleAdd();
    this.qcs.saveQuestions(this.formTitle, this.questions);
    this.form = this.qcs.getFormGroup();
    this.allowGeneration = this.questions.length >= 1;
  }

  addRadioChoice() {
    this.radioChoices.push('');
  }

  removeRadioChoice() {
    this.radioChoices.splice(this.radioChoices.length - 1);
  }

  reset() {
    this.questionKey = '';
    this.questionLabel = '';
    this.questionisRequired = false;
    this.textboxButtonStatus = 'primary';
    this.textareaButtonStatus = 'info';
    this.radioButtonStatus = 'success';
    this.emojiButtonStatus = 'warning';
    this.showChoiceInput = false;
    this.radioChoices = ['', '', ''];
    this.choiceAmount = this.radioChoices.length;
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
      rows: 3,
      required: this.questionisRequired}),
    );
  }

  createRadio(f: NgForm) {
    const emptyArray: string[] = [];
    this.radioChoices = emptyArray;
    for (const value in f.value) {
      if (value.toString().includes('option')) {
        this.radioChoices.push(f.value[value]);
      }
    }

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

  createEmoji() {
    this.questions.push(new EmojiQuestion({
      id: this.questionID++,
      key: this.questionLabel.toLowerCase(),
      label: this.questionLabel,
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

    this.allowGeneration = this.questions.length >= 1;
  }

  onClickGenerateForm() {
    if (this.questions.length > 1) {
      this.qcs.saveQuestions(this.formTitle, this.questions);
    }
  }
}

enum QuestionType {
  Textbox,
  Textarea,
  Radio,
  Emoji,
}
