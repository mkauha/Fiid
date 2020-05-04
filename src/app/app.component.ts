import { Component } from '@angular/core';
import TextBoxQuestion from './models/textBoxQuestion';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h2>Create a form</h2>
    </div>
    <div>
    <button (click)="onAddElement()" >{{buttonName}}</button>
    <ng-container *ngIf="showAddButtons">
        <div>
            <button (click)="onAddTextBoxElement()" >Textbox</button>
            <button (click)="onAddTextAreaElement()" >Text area</button>
            <button (click)="onAddCheckBoxElement()" >Checkbox</button>
        </div>
    </ng-container>

    <ng-container *ngIf="showFormQuestionInput">
    <div>
    <form>
      <div class="form-group">
        <label for="question">Question: </label>
        <input type="text" class="form-control" id="question" required placeholder="Insert question"
          [(ngModel)]="questionLabel" name="first">
      </div>
    </form>
    </div>
    <button (click)="onSubmitQuestion()" class="btn btn-success">Add question</button>
  </ng-container>
  </div>

  <div>
  <h2>Questions</h2>
  </div>
  <table>
  <thead>
    <tr>
      <th>#</th>
      <th>Label</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let question of questions">
    <td>{{question.id}}</td>
    <td>{{question.label}}</td>
    <td><button (click)="delete(question)">Remove</button></td>
    </tr>
  </tbody>
</table>
  `
})

export class AppComponent {
  questions: object[] = [];
  public showAddButtons: boolean = false;
  public showFormQuestionInput: boolean = false;
  public buttonName: String = 'Add';

  public questionID = 0;
  public questionLabel = '';
  public questionKey = '';
  public questionType = '';
  public isRequired = false;

  constructor() {
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
    this.toggleFormQuestionInput();
  }

  onAddTextAreaElement() {

  }

  onAddCheckBoxElement() {

  }

  onSubmitQuestion() {
    const textBoxQuestion = new TextBoxQuestion(
      this.questionID++,
      // create actual key?
      this.questionLabel,
      this.questionLabel,
      this.isRequired
    );

    console.log(textBoxQuestion);
    this.questions.push(textBoxQuestion);
    this.toggleFormQuestionInput();
    this.toggleAdd();
  }

  delete(question: Object) {

  }
}
