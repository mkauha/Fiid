import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '../forms/question-base';

@Component({
  selector: 'app-preview-form',
  templateUrl: './preview-form.component.html',
  styleUrls: ['./preview-form.component.css']
})
export class PreviewFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() questions: QuestionBase[] = [];
  @Input() formTitle = ' ';

  constructor() { }

  ngOnInit(): void {

  }

}
