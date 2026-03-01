import { ITextStyleType, TextStyleType } from '@src/text-stlye/text-style-type.ts';
import { stringsToTextStyle } from '@src/text-stlye/strings-to-text-style.ts';

export class TextStyle {
  private readonly textStyle: TextStyleType;

  constructor({ className, style }: { className: string; style: ITextStyleType }) {
    this.textStyle = new TextStyleType({
      ...style,
      className,
    });
  }

  get cssRoot() {
    return {
      [`--text-style-${this.textStyle.className}-font-size`]: this.textStyle.fontSize,
      [`--text-style-${this.textStyle.className}-line-height`]: this.textStyle.lineHeight,
      [`--text-style-${this.textStyle.className}-letter-spacing`]: this.textStyle.letterSpacing,
      [`--text-style-${this.textStyle.className}-font-weight`]: this.textStyle.fontWeight,
      [`--text-style-${this.textStyle.className}-color`]: this.textStyle.color,
      [`--text-style-${this.textStyle.className}-text-transform`]: this.textStyle.textTransform,
      [`--text-style-${this.textStyle.className}-font-style`]: this.textStyle.fontStyle,
      [`--text-style-${this.textStyle.className}-font-family`]: this.textStyle.fontFamily,
      [`--text-style-${this.textStyle.className}-width`]: this.textStyle.width,
      [`--width-${this.textStyle.className}`]: `var(--text-style-${this.textStyle.className}-width)`,
      [`--text-style-${this.textStyle.className}-margin-top`]: this.textStyle.marginTop,
      [`--text-style-${this.textStyle.className}-margin-bottom`]: this.textStyle.marginBottom,
    };
  }

  getBase() {
    const result: any = {
      ['[class^="text-"]+.text-' + this.textStyle.className]: {
        marginTop: `var(--text-style-${this.textStyle.className}-margin-top)`,
      },
      [`.text-${this.textStyle.className}:has(+[class^="text-"])`]: {
        marginBottom: `var(--text-style-${this.textStyle.className}-margin-bottom)`,
      },
    };

    this.textStyle.exceptions.forEach((exception) => {
      const textStyleType = new TextStyleType(exception.textStyle);
      const overrides = Object.fromEntries(
        Object.entries({
          fontSize: exception.textStyle.fontSize ? textStyleType.fontSize : undefined,
          lineHeight: exception.textStyle.lineHeight ? textStyleType.lineHeight : undefined,
          letterSpacing: exception.textStyle.letterSpacing ? textStyleType.letterSpacing : undefined,
          fontWeight: exception.textStyle.fontWeight ? textStyleType.fontWeight : undefined,
          color: exception.textStyle.color ? textStyleType.color : undefined,
          textTransform: exception.textStyle.textTransform ? textStyleType.textTransform : undefined,
          fontStyle: exception.textStyle.fontStyle ? textStyleType.fontStyle : undefined,
          fontFamily: exception.textStyle.fontFamily ? textStyleType.fontFamily : undefined,
          width: exception.textStyle.width ? textStyleType.width : undefined,
          marginTop: exception.textStyle.marginTop ? textStyleType.marginTop : undefined,
          marginBottom: exception.textStyle.marginBottom ? textStyleType.marginBottom : undefined,
        }).filter(([_, value]) => value),
      );

      let querySelector = '.text-' + this.textStyle.className;
      let mediaRule: string | null = null;

      exception.rules.forEach((rule) => {
        if (rule.startsWith('next-text-')) {
          let cssRule = rule.replace(/^next-text-/, '');
          if (cssRule === 'any') {
            cssRule = '[class^=text-]';
          } else {
            cssRule = `.text-${cssRule}`;
          }
          querySelector += `:has(+${cssRule})`;
        } else if (rule.startsWith('prev-text-')) {
          let cssRule = rule.replace(/^prev-text-/, '');
          if (cssRule === 'any') {
            cssRule = '[class^=text-]';
          } else {
            cssRule = `.text-${cssRule}`;
          }
          querySelector = `${cssRule} + ${querySelector}`;
        } else if (
          rule.startsWith('sm') ||
          rule.startsWith('md') ||
          rule.startsWith('lg') ||
          rule.startsWith('xl') ||
          rule.startsWith('2xl')
        ) {
          mediaRule = `@media (width >= theme(breakpoint.${rule.split(':')[0]}))`;
        }
      });

      if (mediaRule) {
        if (!(mediaRule in result)) {
          result[mediaRule] = {};
        }
        result[mediaRule][querySelector] = overrides;
      } else {
        result[querySelector] = overrides;
      }
    });

    return result;
  }

  get utilities() {
    const responsiveOverrides = Object.fromEntries(
      this.textStyle.exceptions
        .map((exception) => ({
          textStyle: exception.textStyle,
          responsiveOverride: exception.rules.find(
            (rule) =>
              rule.startsWith('sm') ||
              rule.startsWith('md') ||
              rule.startsWith('lg') ||
              rule.startsWith('xl') ||
              rule.startsWith('2xl'),
          ),
        }))
        .filter(({ textStyle, responsiveOverride }) => textStyle !== undefined && responsiveOverride !== undefined)
        .map(({ textStyle, responsiveOverride }) => {
          const textStyleType = new TextStyleType(textStyle);

          return [
            `@media (min-width: theme(breakpoint.${responsiveOverride}))`,
            {
              fontSize: textStyle.fontSize ? textStyleType.fontSize : undefined,
              lineHeight: textStyle.lineHeight ? textStyleType.lineHeight : undefined,
              letterSpacing: textStyle.letterSpacing ? textStyleType.letterSpacing : undefined,
              fontWeight: textStyle.fontWeight ? textStyleType.fontWeight : undefined,
              color: textStyle.color ? textStyleType.color : undefined,
              textTransform: textStyle.textTransform ? textStyleType.textTransform : undefined,
              fontStyle: textStyle.fontStyle ? textStyleType.fontStyle : undefined,
              fontFamily: textStyle.fontFamily ? textStyleType.fontFamily : undefined,
              width: textStyle.width ? textStyleType.width : undefined,
              marginTop: textStyle.marginTop ? textStyleType.marginTop : undefined,
              marginBottom: textStyle.marginBottom ? textStyleType.marginBottom : undefined,
            },
          ];
        }),
    );

    if (Object.keys(responsiveOverrides).length > 0) {
      console.log('overrides', responsiveOverrides);
    }

    const type = {
      fontSize: `var(--text-style-${this.textStyle.className}-font-size)`,
      lineHeight: `var(--text-style-${this.textStyle.className}-line-height)`,
      letterSpacing: `var(--text-style-${this.textStyle.className}-letter-spacing)`,
      fontWeight: `var(--text-style-${this.textStyle.className}-font-weight)`,
      color: `var(--text-style-${this.textStyle.className}-color)`,
      textTransform: `var(--text-style-${this.textStyle.className}-text-transform)`,
      fontStyle: `var(--text-style-${this.textStyle.className}-font-style)`,
      fontFamily: `var(--text-style-${this.textStyle.className}-font-family)`,
      ...responsiveOverrides,
    };

    return {
      ['.type-' + this.textStyle.className]: type,
      ['.text-' + this.textStyle.className]: {
        ...type,
        width: `var(--text-style-${this.textStyle.className}-width)`,
      },
      ['.w-' + this.textStyle.className]: {
        width: `var(--width-${this.textStyle.className})`,
      },
    };
  }

  get variants() {
    return [
      [`next-text-${this.textStyle.className}`, `&:has(+.text-${this.textStyle.className})`],
      [`prev-text-${this.textStyle.className}`, `.text-${this.textStyle.className} + &`],
    ];
  }
}
