export default class TextBoxQuestion {
    _id: number;
    _questionType: string;
    // create actual key?
    _key: string;
    _label: string;
    _required: boolean;

    constructor(id: number, key: string, label: string, required: boolean) {
        this._id = id;
        this._questionType = 'textbox'
        this._key = key;
        this._label = label;
        this._required = required;
    }

    public get id(): number {
        return this._id;
    }
    public set id(id: number) {
        this._id = id;
    }
    public get questionType(): string {
        return this._questionType;
    }
    public get key(): string {
        return this._key;
    }
    public set key(key: string) {
        this._key = key;
    }
    public get label(): string {
        return this._label;
    }
    public set label(label: string) {
        this._label = label;
    }
    public get required(): boolean {
        return this._required;
    }
    public set required(required: boolean) {
        this._required = required;
    }
    public toString(): string {
        return `
        TextBoxQuestion={
            id: ${this._id},
            key: ${this._key},
            label: ${this._label},
            required: ${this._required}
        }`
    }
}
