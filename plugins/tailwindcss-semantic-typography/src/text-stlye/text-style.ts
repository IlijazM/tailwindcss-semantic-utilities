import { TextStyleType } from '@src/text-stlye/text-style-type.ts';

export class TextStyle {
  private textStyle: TextStyleType;

  constructor(textStyle: TextStyleType) {
    this.textStyle = textStyle;
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