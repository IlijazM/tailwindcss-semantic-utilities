import {TextStyleType} from '@src/text-stlye/text-style-type.ts';
import {stringsToTextStyle} from "@src/text-stlye/strings-to-text-style.ts";

export class TextStyle {
  private textStyle: TextStyleType;

  constructor({className, style}: {className: string, style: string | string[]}) {
    this.textStyle = new TextStyleType({
      className,
      ...stringsToTextStyle(style),
    });
  }

  get object() {
    return {
      // allow both input with and without leading dot.
      [".text-" + this.textStyle.className.replace(/^\./, "")]: {
        fontSize: this.textStyle.fontSize,
        lineHeight: this.textStyle.lineHeight,
        letterSpacing: this.textStyle.letterSpacing,
        fontWeight: this.textStyle.fontWeight,
        color: this.textStyle.color,
        textTransform: this.textStyle.textTransform,
        fontStyle: this.textStyle.fontStyle,
        fontFamily: this.textStyle.fontFamily ?? "var(--font-sans-serif)",
      },
    };
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
    }
  }

  get cssDeclarations() {
    return {
      [".text-" + this.textStyle.className]: {
        fontSize: `var(--text-style-${this.textStyle.className}-font-size)`,
        lineHeight: `var(--text-style-${this.textStyle.className}-line-height)`,
        letterSpacing: `var(--text-style-${this.textStyle.className}-letter-spacing)`,
        fontWeight: `var(--text-style-${this.textStyle.className}-font-weight)`,
        color: `var(--text-style-${this.textStyle.className}-color)`,
        textTransform: `var(--text-style-${this.textStyle.className}-text-transform)`,
        fontStyle: `var(--text-style-${this.textStyle.className}-font-style)`,
        fontFamily: `var(--text-style-${this.textStyle.className}-font-family)`,
      },
    };
  }
}