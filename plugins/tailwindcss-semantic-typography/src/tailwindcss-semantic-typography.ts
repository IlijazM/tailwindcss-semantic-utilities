import { TextStyle } from '@src/text-stlye/text-style.ts';
import {stringsToTextStyle} from "@src/text-stlye/strings-to-text-style.ts";

export class TailwindCssSemanticTypographyPlugin {
  public get cssDeclarations() {
    return {
      ...new TextStyle({
        className: 'text-display-1',
        ...stringsToTextStyle("text-7xl; leading-32; tracking-tighter; font-normal; color-[var(--color-content-emphasis, var(--color-black))]")
      }).object,
      ...new TextStyle({
        className: 'text-display-2',
        fontSize: 'text-5xl',
        lineHeight: 'leading-20',
        letterSpacing: 'tracking-tighter',
        fontWeight: 'font-normal',
        color: 'var(--color-content-emphasis, var(--color-black))',
      }).object,
      ...new TextStyle({
        className: 'text-heading',
        fontSize: 'text-3xl',
        lineHeight: 'leading-12',
        letterSpacing: 'tracking-tight',
        fontWeight: 'font-extrabold',
        color: 'var(--color-content-emphasis, var(--color-black))',
      }).object,
      ...new TextStyle({
        className: 'text-subheading',
        fontSize: 'text-lg',
        lineHeight: 'leading-8',
        letterSpacing: 'tracking-normal',
        fontWeight: 'font-bold',
        color: 'var(--color-content-emphasis, var(--color-black))',
      }).object,
      ...new TextStyle({
        className: 'text-lead',
        fontSize: 'text-xl',
        lineHeight: 'leading-7',
        letterSpacing: 'tracking-normal',
        fontWeight: 'font-normal',
        color: 'var(--color-content-text-emphasis, --color-black)',
      }).object,
      ...new TextStyle({
        className: 'text-body',
        fontSize: 'text-base',
        lineHeight: 'leading-6',
        letterSpacing: 'tracking-normal',
        fontWeight: 'font-normal',
        color: 'var(--color-content-text, var(--color-neutral-700))',
      }).object,
      ...new TextStyle({
        className: 'text-quote',
        fontSize: 'text-xl',
        lineHeight: 'leading-7',
        letterSpacing: 'tracking-normal',
        fontWeight: 'font-medium',
        color: 'var(--color-content-text-muted, var(--color-neutral-500))',
        fontStyle: 'italic',
      }).object,
      ...new TextStyle({
        className: 'text-overline',
        fontSize: 'text-xs',
        lineHeight: 'leading-5',
        letterSpacing: 'tracking-widest',
        fontWeight: 'font-bold',
        color: 'var(--color-content-emphasis, var(--color-black))',
        textTransform: 'uppercase',
      }).object,
      ...new TextStyle({
        className: 'text-code',
        fontSize: 'text-base',
        lineHeight: 'leading-5',
        letterSpacing: 'tracking-normal',
        fontWeight: 'font-normal',
        color: 'var(--color-content-emphasis, var(--color-black))',
        fontFamily: 'theme(fontFamily.mono)',
      }).object,
      ...new TextStyle({
        className: 'text-button',
        fontSize: 'text-base',
        lineHeight: 'leading-5',
        letterSpacing: 'tracking-widest',
        fontWeight: 'font-medium',
        color: 'var(--color-content-emphasis, var(--color-black))',
        textTransform: 'uppercase',
      }).object,
      ...new TextStyle({
        className: 'text-heading-1',
        fontSize: 'text-7xl',
        lineHeight: '8rem',
        letterSpacing: 'tracking-tighter',
        fontWeight: 'font-normal',
        color: 'var(--color-content-emphasis, var(--color-black))',
      }).object,
      ...new TextStyle({
        className: 'text-heading-2',
        fontSize: 'text-5xl',
        lineHeight: 'leading-20',
        letterSpacing: 'tracking-tighter',
        fontWeight: 'font-normal',
        color: 'var(--color-content-emphasis, var(--color-black))',
      }).object,
      ...new TextStyle({
        className: 'text-heading-3',
        fontSize: 'text-4xl',
        lineHeight: 'leading-15',
        letterSpacing: 'tracking-tight',
        fontWeight: 'font-semibold',
        color: 'var(--color-content-emphasis, var(--color-black))',
      }).object,
      ...new TextStyle({
        className: 'text-heading-4',
        fontSize: 'text-3xl',
        lineHeight: 'leading-10',
        letterSpacing: 'tracking-tight',
        fontWeight: 'font-bold',
        color: 'var(--color-content-emphasis, var(--color-black))',
      }).object,
      ...new TextStyle({
        className: 'text-heading-5',
        fontSize: 'text-lg',
        lineHeight: 'leading-7',
        letterSpacing: 'tracking-normal',
        fontWeight: 'font-bold',
        color: 'var(--color-content-emphasis, var(--color-black))',
      }).object,
      ...new TextStyle({
        className: 'text-heading-6',
        fontSize: 'text-base',
        lineHeight: 'leading-6',
        letterSpacing: 'tracking-normal',
        fontWeight: 'font-black',
        color: 'var(--color-content-emphasis, var(--color-black))',
      }).object,
    };
  }

  public get themeExtension() {
    return {};
  }

  constructor(options: unknown) {}
}
