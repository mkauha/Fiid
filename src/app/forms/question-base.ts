export interface Options {
    // Label to be shown in UI
    label?: string;
    // textbox, slider, ...?
    controlType?: string;
    // key to differentiate the form elements
    key?: string;
    // Is it required or not?
    required?: boolean;
}

export class QuestionBase {
    label: string;
    controlType: string;
    key: string;
    required: boolean;

    constructor(options: Options) {
        this.label = options.label;
        this.controlType = options.controlType;
        this.key = options.key;
        this.required = options.required;
    }
}
