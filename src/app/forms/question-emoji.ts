import { QuestionBase, Options } from './question-base';

export class EmojiQuestion extends QuestionBase {
    // Will be emoji, overrides the base classes control type
    controlType = 'emoji';
    controlTypeLabel = 'Emoji';

    constructor(options: object) {
        super(options);
    }
}
