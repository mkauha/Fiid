import { Component, OnInit, forwardRef, Output, EventEmitter  } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { faSmile, faMeh, faFrown } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-div-emoji-select',
  providers: [
    {
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DivEmojiSelectComponent),
        multi: true
    }
  ],
  templateUrl: './div-emoji-select.component.html',
  styleUrls: ['./div-emoji-select.component.css']
})
export class DivEmojiSelectComponent implements OnInit, ControlValueAccessor  {
  // tslint:disable-next-line: no-output-on-prefix
  @Output() onEmojiClick = new EventEmitter<string>();
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
  constructor() { }

  emojiClick(event: any) {
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
    this.onEmojiClick.emit(this.selectedEmoji);
  }

  writeValue(obj: any): void {

  }
  registerOnChange(fn: any): void {

  }
  registerOnTouched(fn: any): void {

  }
  setDisabledState?(isDisabled: boolean): void {

  }

  ngOnInit(): void {
  }

}
