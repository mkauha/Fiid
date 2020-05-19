import { QuestionBase, Options } from './question-base';

export class TextareaQuestion extends QuestionBase {
    // Will be textbox, overrides the base classes control type
    controlType = 'textarea';
    controlTypeLabel = 'Long';
    // Amount of rows
    rows: number;

    constructor(options: object) {
        super(options);
        this.rows = options['rows'];
    }
}
