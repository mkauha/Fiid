import { QuestionBase, Options } from './question-base';

export class RadioQuestion extends QuestionBase {
    // Will be radio, overrides the base classes control type
    controlType = 'radio';
    // Amount of choices
    optionAmount: number;

    constructor(options: object) {
        super(options);
        this.optionAmount = options['optionAmount'];
    }
}
