import { Component, OnInit } from '@angular/core';
import { QuestionBase } from '../forms/question-base';
import { QuestionControlService } from '../question-control.service';
import { FormGroup, NgForm } from '@angular/forms';
import { TextboxQuestion } from '../forms/question-textbox';
import { RadioQuestion } from '../forms/question-radio';
import { TextareaQuestion } from '../forms/question-textarea';
import { PreviewFormComponent } from '../preview-form/preview-form.component';
import { EmojiQuestion } from '../forms/question-emoji';
import { HttpService } from '../http.service';
import { GeneratedForm } from '../forms/generated-form';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';


@Component({
  selector: 'app-formbuilder',
  templateUrl: './formbuilder.component.html',
  styleUrls: ['./formbuilder.component.css']
})
export class FormbuilderComponent implements OnInit {

  public questions: QuestionBase[] = [];
  public form: FormGroup;

  public titleValid = false;
  public formValid = false;
  public formTitle = '';
  public showAddButtons = false;
  public showFormQuestionInput = false;
  public showGeneratedUrl = false;
  public formUUID = '';
  public baseUrl = 'http://localhost:4200/form/';
  public baseApiUrl = 'http://localhost:3000/forms/';
  public generatedUrl = `${this.baseUrl}0ae34a35-d281-4867-89c2-1e2d77d747b6`;

  public addButtonStatus = 'success';
  public addButtonIcon = 'plus';
  public addButtonName = 'Add';

  public questionType: QuestionType;

  public questionID = 0;
  public questionKey = '';
  public questionLabel = '';
  public questionisRequired = false;
  public questionResults: string[] = [];

  public showChoiceInput = false;
  public radioChoices = ['', '', ''];
  public choiceAmount = this.radioChoices.length;

  private baseButtonStatus = 'basic';
  public selectedInputStatus = 'basic';
  public textboxButtonStatus = 'primary';
  public textareaButtonStatus = 'info';
  public radioButtonStatus = 'success';
  public emojiButtonStatus = 'warning';

  constructor(private qcs: QuestionControlService, private httpService: HttpService, private router: Router) {}

  ngOnInit(): void {}

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

    const date = new Date();
    const dateMonth = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    this.reset();
    this.toggleFormQuestionInput();
    this.toggleAdd();
    this.qcs.saveForm(new GeneratedForm(this.formTitle, dateMonth, this.questions, this.questionResults));
    this.form = this.qcs.getFormGroup();

    this.formValid = this.questions.length >= 1;
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
      textboxtype: 'string',
      required: this.questionisRequired,
      results: this.questionResults,
     }),
    );
  }

  createTextarea() {
    this.questions.push(new TextareaQuestion({
      id: this.questionID++,
      key: this.questionLabel.toLowerCase(),
      label: this.questionLabel,
      rows: 3,
      required: this.questionisRequired,
      results: this.questionResults,
    }),
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
      required: this.questionisRequired,
      results: this.questionResults,
    }),
    );
  }

  createEmoji() {
    this.questions.push(new EmojiQuestion({
      id: this.questionID++,
      key: this.questionLabel.toLowerCase(),
      label: this.questionLabel,
      required: this.questionisRequired,
      results: this.questionResults,
    }),
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

    this.formValid = this.questions.length >= 1;
  }

  checkTitleValidity() {
    this.titleValid = this.formTitle.length >= 1 && this.formTitle !== ' ';
  }

  onClickGenerateForm() {
    if (this.questions.length >= 1) {
      this.formUUID = uuidv4();
      const date = new Date();
      const dateMonth = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
      this.qcs.saveForm(new GeneratedForm(this.formTitle, dateMonth, this.questions, this.questionResults));
      this.httpService.postGeneratedForm(this.formUUID, this.qcs.getForm());
      this.showGeneratedUrl = true;
      this.generatedUrl = `${this.baseUrl}${this.formUUID}`;
    }
  }

  onGoToGeneratedUrl() {
    this.router.navigate(['/form'], { queryParams: { id: this.formUUID } });
  }

  onGoToResults() {
    this.router.navigate(['/results'], { queryParams: { id: this.formUUID } });
  }

  onCopyGeneratedUrl(inputElement) {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

  onModifyForm() {
    this.httpService.deleteGeneratedForm(this.formUUID);
    this.showGeneratedUrl = false;
  }
}

enum QuestionType {
  Textbox,
  Textarea,
  Radio,
  Emoji,
}
