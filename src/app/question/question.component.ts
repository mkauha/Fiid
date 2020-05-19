import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  @Input() question;
  @Input() form: FormGroup;
  selectedRadioOption: string;
  selectedEmoji: string;

  constructor() {}

  ngOnInit(): void {}

  emojiClick(event: string) {
    this.selectedEmoji = event;
  }
}
