import { TYPE } from "../constants";
import { Type } from "./Type";

export class ConditionalType<IfTrue extends Type = Type, IfFalse extends Type = Type> extends Type {
    protected readonly [TYPE] = "ConditionalType";

    public constructor(name: string, private readonly picker: (v: any) => boolean, private readonly ifTrue: IfTrue, private readonly ifFalse: IfFalse) {
        super(name);
    }

    public validate(v: any) {
        if (process.env.NODE_ENV === "production") return true;

        const type = this.picker(v) ? this.ifTrue : this.ifFalse;

        return type.validate(v);
    }
}
