import { TextStyle } from '@src/text-stlye/text-style.ts';

export class TailwindCssSemanticTypographyPlugin {
  public get cssDeclarations() {
    return {
      ...new TextStyle({
        className: '.text-display-1',
        fontSize: 'theme(fontSize.9xl)',
        lineHeight: '12rem',
        letterSpacing: 'theme(letterSpacing.tighter)',
        fontWeight: 'theme(fontWeight.normal)',
        color: 'theme(colors.black)',
      }).object,
      ...new TextStyle({
        className: '.text-display-2',
        fontSize: 'theme(fontSize.7xl)',
        lineHeight: '8rem',
        letterSpacing: 'theme(letterSpacing.tighter)',
        fontWeight: 'theme(fontWeight.normal)',
        color: 'theme(colors.black)',
      }).object,
    };
  }

  public get themeExtension() {
    return {};
  }

  constructor(options: unknown) {}
}
