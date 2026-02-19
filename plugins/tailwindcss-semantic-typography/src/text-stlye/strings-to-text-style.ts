import { ITextStyleType } from '@src/text-stlye/text-style-type.ts';

export function stringsToTextStyle(strings: string[] | string): ITextStyleType {
  if (typeof strings === 'string') {
    strings = [strings];
  }
  strings = strings.flatMap((string) => string.split(';')).map((string) => string.trim());

  let result: Partial<ITextStyleType> = { exceptions: [] };

  for (const extractor of Object.values(extractors)) {
    for (const string of strings) {
      if (string.includes(":")) {
        const split = string.split(':');
        const rules = split.filter((_, i) => i !== split.length - 1);
        const textStyle = extractor(split.at(-1)!);

        if (Object.keys(textStyle).length === 0) {
          continue;
        }

        result.exceptions!.push({
          rules,
          textStyle: textStyle as ITextStyleType,
        });
      } else {
        result = { ...result, ...extractor(string) };
      }
    }
  }

  return result as ITextStyleType;
}

const extractors = {
  extractFontSize: extractRuleBuilder({ ruleName: 'fontSize', tailwindPrefix: 'text-' }),
  extractLineHeight: extractRuleBuilder({ ruleName: 'lineHeight', tailwindPrefix: 'leading-' }),
  extractLetterSpacing: extractRuleBuilder({ ruleName: 'letterSpacing', tailwindPrefix: 'tracking-' }),
  extractFontWeight: extractRuleBuilder({
    ruleName: 'fontWeight',
    tailwindRegex: /^font-(\d+|thin|extralight|light|normal|medium|semibold|bold|extrabold|black)/,
  }),
  extractColor: extractRuleBuilder({ ruleName: 'color', tailwindPrefix: 'color-' }),
  extractTextTransform: extractRuleBuilder({
    ruleName: 'textTransform',
    allowedValues: ['uppercase', 'lowercase', 'normal-case'],
  }),
  extractFontStyle: extractRuleBuilder({ ruleName: 'fontStyle', allowedValues: ['italic', 'not-italic'] }),
  extractFontFamily: extractRuleBuilder({
    ruleName: 'fontFamily',
    tailwindPrefix: 'font-',
    negativeTailwindRegex: /^font-(\d+|thin|extralight|light|normal|medium|semibold|bold|extrabold|black)/,
  }),
  extractWidth: extractRuleBuilder({ ruleName: 'width', tailwindPrefix: 'w-' }),
  extractMarginTop: extractRuleBuilder({ ruleName: 'marginTop', tailwindPrefix: ['mt-','my-'] }),
  extractMarginBottom: extractRuleBuilder({ ruleName: 'marginBottom', tailwindPrefix: ['mb-', 'my-'] }),
};

function extractRuleBuilder({
  ruleName,
  tailwindPrefix,
  tailwindRegex,
  negativeTailwindRegex,
  allowedValues,
}: {
  ruleName: string;
  tailwindPrefix?: string | string[];
  tailwindRegex?: RegExp;
  negativeTailwindRegex?: RegExp;
  allowedValues?: string[];
}) {
  const ruleNameCamelCase = ruleName;
  const ruleNameKebabCase = camelCaseToKebabCase(ruleName);

  return function (input: string): Partial<ITextStyleType> {
    const inputStartsWithTailwindPrefix =
      tailwindPrefix &&
      (typeof tailwindPrefix === 'string'
        ? input.startsWith(tailwindPrefix)
        : tailwindPrefix.some((prefix) => input.startsWith(prefix)));

    if (negativeTailwindRegex && negativeTailwindRegex.test(input)) {
      return {};
    } else if (inputStartsWithTailwindPrefix) {
      if (input.startsWith(tailwindPrefix + '[') && input.endsWith(']')) {
        return { [ruleName]: input.replace(new RegExp(tailwindPrefix + '\\['), '').replace(/]$/, '') };
      } else {
        return { [ruleName]: input };
      }
    } else if (tailwindRegex && tailwindRegex.test(input)) {
      return { [ruleName]: input };
    } else if (allowedValues && allowedValues.includes(input)) {
      return { [ruleName]: input };
    } else if (input.startsWith(ruleNameCamelCase) || input.startsWith(ruleNameKebabCase)) {
      const ruleNames = [ruleNameCamelCase, ruleNameKebabCase];
      const ruleNamePattern = ruleNames
        .map((name) => name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')) // escape
        .join('|');
      const ruleRegex = new RegExp(`^(${ruleNamePattern}):?\\s*`);
      const rule = input.replace(ruleRegex, '');
      return { [ruleName]: rule };
    }
    return {};
  };
}

function camelCaseToKebabCase(camelCase: string): string {
  return camelCase
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1-$2')
    .toLowerCase();
}
