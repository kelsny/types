import { TYPE } from "../constants";
import { Type } from "./Type";

export class UnionType<Union extends Type[] = Type[]> extends Type {
    protected readonly [TYPE] = "UnionType";

    public constructor(name: string, public readonly types: Union) {
        super(name);

        if (!Array.isArray(types) || !types.every((t) => t instanceof Type)) throw new TypeError(`Members of union types must be valid types.`);

        Object.freeze(this);
    }

    public validate(v: any) {
        if (process.env.NODE_ENV === "production") return true;

        return this.types.some((t) => t.validate(v));
    }
}
