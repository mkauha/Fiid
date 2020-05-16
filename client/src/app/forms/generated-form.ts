import { QuestionBase } from './question-base';

export class GeneratedForm {
    title: string;
    questions: QuestionBase[];
    date: Date;

    constructor(title: string, date: Date, questions: QuestionBase[]) {
        this.title = title;
        this.date = date;
        this.questions = questions;
    }
}
