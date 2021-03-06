export interface Options {
    id?: number;
    // Label to be shown in UI
    label?: string;
    // textbox, slider, ...?
    controlType?: string;
    // Short, Long, Emoji?
    controlTypeLabel?: string;
    // key to differentiate the form elements
    key?: string;
    // Is it required or not?
    required?: boolean;
    results?: string[];
}

export class QuestionBase {
    id: number;
    label: string;
    controlType: string;
    controlTypeLabel: string;
    key: string;
    required: boolean;
    results: string[];

    constructor(options: Options) {
        this.id = options.id;
        this.label = options.label;
        this.controlType = options.controlType;
        this.controlTypeLabel = options.controlTypeLabel;
        this.key = options.key;
        this.required = options.required;
        this.results = options.results;
    }
}
