import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from './forms/question-base';

@Injectable()
export class QuestionControlService {

    questions: QuestionBase[];

    saveQuestions(questions: QuestionBase[]) {
        this.questions = questions;
    }

    getQuestions(): QuestionBase[] {
        return this.questions;
    }

    getFormGroup(): FormGroup {
        const group: any = {};

        for (const question of this.questions) {
            if (question.required) {
                group[question.key] = new FormControl('', Validators.required);
            } else {
                group[question.key] = new FormControl();
            }
        }
        // return new FormGroup({name: new FormControl(), age: new FormControl()})
        return new FormGroup(group);
    }
}
