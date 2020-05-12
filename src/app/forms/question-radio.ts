import { QuestionBase, Options } from './question-base';

export class RadioQuestion extends QuestionBase {
    // Will be radio, overrides the base classes control type
    controlType = 'radio';
    controlTypeLabel = 'Emoji';
    // Amount of choices
    choiceAmount: number;
    choices: string[];

    constructor(options: object) {
        super(options);
        this.choiceAmount = options['choiceAmount'];
        this.choices = options['choices'];
    }
}
