import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DivEmojiSelectComponent } from './div-emoji-select.component';

describe('DivEmojiSelectComponent', () => {
  let component: DivEmojiSelectComponent;
  let fixture: ComponentFixture<DivEmojiSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DivEmojiSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DivEmojiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
