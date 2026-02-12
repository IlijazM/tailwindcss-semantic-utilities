import {OptionsType} from "./tailwind-options";

export interface ConfigurableType<T> {
    /**
     * Prefix of that configurable.
     *
     * Don't prefix or suffix this with "-" because this will happen automatically.
     */
    prefix: string;

    /** Also the default value. */
    value: T;
    onApply?: (value: T) => void;
    description?: string;
}

export abstract class Configurable<T> implements ConfigurableType<T> {
    private static sanitizePrefix(prefix: string): string {
        if (prefix.trim() !== prefix) {
            console.warn(`The given prefix '${prefix}' is not trimmed which is invalid. The prefix will automatically fix itself.`)
            prefix = prefix.trim();
        }

        const validRegex = /[A-z_-][A-z0-9_-]*/;

        if (validRegex.test(prefix)) {
            throw new Error(`The inputted prefix '${prefix}' is not a valid prefix. The regex for a valid prefix is: '${validRegex}'.`);
        }

        const leadingTrailingDashRegex = /^-+|-+$/g;

        if (leadingTrailingDashRegex.test(prefix)) {
            console.warn(`The given prefix '${prefix}' is starts and/or ends with '-' which is invalid. The prefix will automatically fix itself.`)
            prefix = prefix.replace(leadingTrailingDashRegex, '');
        }

        return prefix;
    }

    public prefix: string;
    private readonly _onApply?: (value: T) => void;
    public value: T;

    protected constructor({prefix, onApply, value}: ConfigurableType<T>) {
        this.prefix = Configurable.sanitizePrefix(prefix);
        this._onApply = onApply;
        this.value = value;
    }

    public onApply(value: T) {
        if (this._onApply) {
            this._onApply(value);
        } else {
            this.value = value;
        }
    }

    public abstract toObject(): OptionsType;
}

export class ConfigurableOptions<T extends Configurable<OptionsType>[]> extends Configurable<T> {
    constructor(args: ConfigurableType<T>) {
        super(args);
    }

    toObject(): OptionsType {
        return Object.assign({}, ...this.value.map(e => Object.fromEntries(Object.entries(e.toObject()).map(([key, value]) => [this.prefix + "-" + key, value]))));
    }
}


export class ConfigurableObject<T extends OptionsType> extends Configurable<T> {
    constructor(args: ConfigurableType<T>) {
        super(args);
    }

    toObject(): OptionsType {
        return Object.fromEntries(
            Object.entries(this.value).map(([key, value]) => [this.prefix + "-" + key, value])
        )
    }
}

export class ConfigurableFlag extends Configurable<boolean> {
    constructor(args: ConfigurableType<boolean>) {
        super(args);
    }

    toObject(): OptionsType {
        return {[this.prefix]: this.value};
    }
}

// example

const semanticTypographyOptions = new ConfigurableOptions({
    prefix: "semantic",
    value: [
        new ConfigurableObject({
            prefix: "typography",
            value: {
                foo: "foo",
                bar: "bar",
                baz: "baz",
            }
        }),
        new ConfigurableFlag({
            prefix: "allow-query-selectors",
            value: true,
        })
    ]
});