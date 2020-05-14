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

  faFrown = faFrown;
  faMeh = faMeh;
  faSmile = faSmile;

  faIconUnselectedColor = '#DBE1EA';
  faFrownDefaultColor = '#FF3A6C';
  faMehDefaultColor = '#FFA538';
  faSmileDefaultColor = '#00D390';

  faFrownColor = this.faFrownDefaultColor;
  faMehColor = this.faMehDefaultColor;
  faSmileColor = this.faSmileDefaultColor;

  constructor() {

  }

  ngOnInit(): void {
    console.log(this.question);
  }

  delete(question: QuestionBase) {
    console.log(question);
    this.onDeleteClicked.emit(question);
  }

  emojiClick(event: any) {
    console.log(event);
    switch (event.target.value) {
      case '1': this.faFrownColor = this.faFrownDefaultColor;
                this.faMehColor = this.faIconUnselectedColor;
                this.faSmileColor = this.faIconUnselectedColor;
                break;
      case '2': this.faMehColor = this.faMehDefaultColor;
                this.faSmileColor = this.faIconUnselectedColor;
                this.faFrownColor = this.faIconUnselectedColor;
                break;
      case '3': this.faSmileColor = this.faSmileDefaultColor;
                this.faMehColor = this.faIconUnselectedColor;
                this.faFrownColor = this.faIconUnselectedColor;
                break;
    }
    this.selectedEmoji = event.target.value;
    console.log(this.selectedEmoji);
  }
}
