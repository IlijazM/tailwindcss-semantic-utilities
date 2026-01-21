import {ITextStyleType} from "@src/text-stlye/text-style-type.ts";

export function stringsToTextStyle(strings: string[]): Partial<ITextStyleType> {
    const result: Partial<ITextStyleType> = {};

    for (const string of strings) {
        if (string.startsWith("font-weight:")) {
            // wip
        }
    }

    return result;
}