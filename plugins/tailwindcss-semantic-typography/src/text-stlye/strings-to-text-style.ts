import {ITextStyleType} from "@src/text-stlye/text-style-type.ts";

export function stringsToTextStyle(strings: string[] | string): Partial<ITextStyleType> {
    if (typeof strings === "string") {
        strings = [strings];
    }
    strings = strings.flatMap(string => string.split(";")).map(string => string.trim());


    let result: Partial<ITextStyleType> = {};

    for (const extractor of Object.values(extractors)) {
        for (const string of strings) {
            result = {...result, ...extractor(string)};
        }
    }

    return result;
}

const extractors = {
    extractFontSize: extractRuleBuilder({ruleName: "fontSize", tailwindPrefix: "text-"}),
    extractLineHeight: extractRuleBuilder({ruleName: "lineHeight", tailwindPrefix: "leading-"}),
    extractLetterSpacing: extractRuleBuilder({ruleName: "letterSpacing", tailwindPrefix: "tracking-"}),
    extractFontWeight: extractRuleBuilder({
        ruleName: "fontWeight",
        tailwindRegex: /^font-(\d+|thin|extralight|light|normal|medium|semibold|bold|extrabold|black)/
    }),
    extractColor: extractRuleBuilder({ruleName: "color", tailwindPrefix: "color-"}),
    extractTextTransform: extractRuleBuilder({ruleName: "textTransform", allowedValues: ["uppercase", "lowercase"]}),
    extractFontStyle: extractRuleBuilder({ruleName: "fontStyle", allowedValues: ["italic"]}),
    extractFontFamily: extractRuleBuilder({
        ruleName: "fontFamily",
        tailwindPrefix: 'font-',
        negativeTailwindRegex: /^font-(\d+|thin|extralight|light|normal|medium|semibold|bold|extrabold|black)/,
    }),
}


function extractRuleBuilder({ruleName, tailwindPrefix, tailwindRegex, negativeTailwindRegex, allowedValues}: {
    ruleName: string,
    tailwindPrefix?: string,
    tailwindRegex?: RegExp,
    negativeTailwindRegex?: RegExp,
    allowedValues?: string[]
}) {
    const ruleNameCamelCase = ruleName;
    const ruleNameKebabCase = camelCaseToKebabCase(ruleName);
    return function (input: string): Partial<ITextStyleType> {
        if (negativeTailwindRegex && negativeTailwindRegex.test(input)) {
            return {};
        } else if (tailwindPrefix && input.startsWith(tailwindPrefix)) {
            if (input.startsWith(tailwindPrefix + "[") && input.endsWith("]")) {
                return {[ruleName]: input.replace(new RegExp(tailwindPrefix + "\\["), "").replace(/]$/, "")}
            } else {
                return {[ruleName]: input}
            }
        } else if (tailwindRegex && tailwindRegex.test(input)) {
            return {[ruleName]: input}
        } else if (allowedValues && allowedValues.includes(input)) {
            return {[ruleName]: input};
        } else if (input.startsWith(ruleNameCamelCase) || input.startsWith(ruleNameKebabCase)) {

            const ruleNames = [ruleNameCamelCase, ruleNameKebabCase];
            const ruleNamePattern = ruleNames
                .map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")) // escape
                .join("|");
            const ruleRegex = new RegExp(`^(${ruleNamePattern}):?\\s*`);
            const rule = input.replace(ruleRegex, "");
            return {[ruleName]: rule}
        }
        return {};
    }
}

function camelCaseToKebabCase(camelCase: string): string {
    return camelCase
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
        .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, "$1-$2")
        .toLowerCase();
}