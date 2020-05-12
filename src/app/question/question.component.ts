import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextboxQuestion } from '../forms/question-textbox';
import { QuestionBase } from '../forms/question-base';
import { faSmile, faMeh, faFrown } from '@fortawesome/free-regular-svg-icons';
import { NbIconLibraries } from '@nebular/theme';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question;
  @Input() form: FormGroup;
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onDeleteClicked = new EventEmitter<QuestionBase>();
  selectedRadioOption: string;
  selectedEmoji: string;

  faSmile = faSmile;
  faFrown = faFrown;
  faMeh = faMeh;

  constructor(private iconService: NbIconLibraries) {
    this.iconService.registerFontPack('font-awesome', { iconClassPrefix: 'fa' });
  }

  ngOnInit(): void {
    console.log(this.question);
  }
  
  delete(question: QuestionBase) {
    console.log(question);
    this.onDeleteClicked.emit(question);
  }
}
