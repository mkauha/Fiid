import { QuestionBase } from '../forms/question-base';

export class GeneratedForm {
    title: string;
    questions: QuestionBase[];
    date: string;
    results: string[];

    constructor(title: string, date: string, questions: QuestionBase[], results: string[]) {
        this.title = title;
        this.date = date;
        this.questions = questions;
        this.results = this.results;
    }
}
