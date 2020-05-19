import { QuestionBase, Options } from './question-base';

export class TextboxQuestion extends QuestionBase {
    // Will be textbox, overrides the base classes control type
    controlType = 'textbox';
    controlTypeLabel = 'Short';
    // Is it numeric, text ..?
    textboxtype: string;

    constructor(options: object) {
        super(options);
        this.textboxtype = options['textboxtype'];
    }
}
