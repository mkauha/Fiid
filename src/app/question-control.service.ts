import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from './forms/question-base';

@Injectable()
export class QuestionControlService {

    toFormGroup(questions: QuestionBase[] ): FormGroup {
        const group: any = {};

        for (const question of questions) {
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