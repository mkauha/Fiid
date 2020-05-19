import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { QuestionBase } from '../forms/question-base';
import { GeneratedForm } from '../generated-form/generated-form';

@Injectable()
export class QuestionControlService {

    form: GeneratedForm;
    questions: QuestionBase[] = [];
    formTitle: string;

    saveForm(form: GeneratedForm) {
        this.form = form;
        this.questions = form.questions;
        this.formTitle = form.title;
    }


    saveQuestions(title: string, questions: QuestionBase[]) {
        this.questions = questions;
        this.formTitle = title;
    }

    getForm(): GeneratedForm {
        return this.form;
    }

    getQuestions(): QuestionBase[] {
        return this.questions;
    }

    getFormTitle(): string {
        return this.formTitle;
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
        return new FormGroup(group);
    }
}
