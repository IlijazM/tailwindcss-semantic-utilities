export interface ITextStyleType {
  className: string;

  fontSize?:
    | string
    | 'text-xs'
    | 'text-sm'
    | 'text-base'
    | 'text-lg'
    | 'text-xl'
    | 'text-2xl'
    | 'text-3xl'
    | 'text-4xl'
    | 'text-5xl'
    | 'text-6xl'
    | 'text-7xl'
    | 'text-8xl';

  lineHeight?: string;

  letterSpacing?:
    | string
    | 'tracking-tighter'
    | 'tracking-tight'
    | 'tracking-normal'
    | 'tracking-wide'
    | 'tracking-wider'
    | 'tracking-widest';

  fontWeight?:
    | string
    | 'font-thin'
    | 'font-extralight'
    | 'font-light'
    | 'font-normal'
    | 'font-medium'
    | 'font-semibold'
    | 'font-bold'
    | 'font-extrabold'
    | 'font-black';

  color?: string | 'text-content-text-muted' | 'text-content-text' | 'text-content-text-emphasis';

  textTransform?: string | 'uppercase' | 'lowercase' | 'capitalize' | 'none';

  fontStyle?: string | 'italic' | 'normal';

  fontFamily?: string | 'sans' | 'sans-serif' | 'mono';
}

export class TextStyleType implements ITextStyleType {
  get className(): string {
    // allow both input with and without leading dot.
    if (this.textStyle.className.startsWith(".")) {
      console.warn(`Warning during applying utility '${this.textStyle.className}': this.textStyle.className is not supposed to start with a '.'. This gets fixed automatically.`);
      return this.textStyle.className.replace(/^\./, "");
    }

    return this.textStyle.className;
  }

  get fontSize(): string {
    if (this.textStyle.fontSize?.startsWith("text-")) {
      const fontSize = this.textStyle.fontSize?.replace(/^text-/, "");
      return `theme(fontSize.${fontSize})`;
    }

    return this.textStyle.fontSize ?? 'var(--text-base)';
  }

  get lineHeight(): string {
    if (this.textStyle.lineHeight?.startsWith("leading-")) {
      const lineHeight = this.textStyle.lineHeight?.replace(/^leading-/, "");
      try {
        const lineHeightNumber = parseInt(lineHeight, 10);
        return `calc(var(--spacing) * ${lineHeightNumber})`;
      } catch (_) {
        return `theme(lineHeight.${lineHeight})`;
      }
    }
    return this.textStyle.lineHeight ?? 'theme(lineHeight.normal)';
  }

  get letterSpacing(): string {
    if (this.textStyle.letterSpacing?.startsWith("tracking-")) {
      const letterSpacing = this.textStyle.letterSpacing?.replace(/^tracking-/, "");
      return `theme(letterSpacing.${letterSpacing})`;
    }

    return this.textStyle.letterSpacing ?? 'theme(letterSpacing.normal)';
  }

  get fontWeight(): string {
    if (this.textStyle.fontWeight?.startsWith("font-")) {
      const fontWeight = this.textStyle.fontWeight?.replace(/^font-/, "");
      return `theme(fontWeight.${fontWeight})`;
    }

    return this.textStyle.fontWeight ?? 'theme(fontWeight.normal)';
  }

  get color(): string {
    return this.textStyle.color ?? '';
  }

  get textTransform(): string {
    return this.textStyle.textTransform ?? 'none';
  }

  get fontStyle(): string {
    return this.textStyle.fontStyle ?? 'normal';
  }

  get fontFamily(): string {
    return this.textStyle.fontFamily ?? 'theme(fontFamily.sans)';
  }

  private readonly textStyle: ITextStyleType;

  constructor(textStyle: ITextStyleType) {
    this.textStyle = textStyle;
  }

}
