import { TextStyleType } from '@src/text-stlye/text-style-type.ts';

export class TextStyle {
  private textStyle: TextStyleType;

  constructor(textStyle: TextStyleType) {
    this.textStyle = textStyle;
  }

  get object() {
    return {
      [this.textStyle.className]: {
        fontSize: this.textStyle.fontSize,
        lineHeight: this.textStyle.lineHeight,
        letterSpacing: this.textStyle.letterSpacing,
        fontWeight: this.textStyle.fontWeight,
        color: this.textStyle.color,
      },
    };
  }
}