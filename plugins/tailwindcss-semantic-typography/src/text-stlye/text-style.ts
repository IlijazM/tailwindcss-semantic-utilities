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
      ["." + this.textStyle.className.replace(/^\./, "")]: {
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
}