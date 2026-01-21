import { TextStyle } from '@src/text-stlye/text-style.ts';

export class TailwindCssSemanticTypographyPlugin {
  public get cssDeclarations() {
    return {
      ...new TextStyle({
        className: 'text-display-1',
        fontSize: 'theme(fontSize.7xl)',
        lineHeight: '8rem',
        letterSpacing: 'theme(letterSpacing.tighter)',
        fontWeight: 'theme(fontWeight.normal)',
        color: 'var(--color-content-emphasis, --color-black)',
      }).object,
      ...new TextStyle({
        className: 'text-display-2',
        fontSize: 'theme(fontSize.5xl)',
        lineHeight: '5rem',
        letterSpacing: 'theme(letterSpacing.tighter)',
        fontWeight: 'theme(fontWeight.normal)',
        color: 'var(--color-content-emphasis, --color-black)',
      }).object,
      ...new TextStyle({
        className: 'text-heading',
        fontSize: 'theme(fontSize.3xl)',
        lineHeight: '1.5',
        letterSpacing: 'theme(letterSpacing.tight)',
        fontWeight: 'theme(fontWeight.extrabold)',
        color: 'var(--color-content-emphasis, --color-black)',
      }).object,
      ...new TextStyle({
        className: 'text-subheading',
        fontSize: 'theme(fontSize.lg)',
        lineHeight: '1.8',
        letterSpacing: 'theme(letterSpacing.normal)',
        fontWeight: 'theme(fontWeight.bold)',
        color: 'var(--color-content-emphasis, --color-black)',
      }).object,
      ...new TextStyle({
        className: 'text-lead',
        fontSize: 'theme(fontSize.xl)',
        lineHeight: '1.5',
        letterSpacing: 'theme(letterSpacing.normal)',
        fontWeight: 'theme(fontWeight.normal)',
        color: 'var(--color-content-text-emphasis, --color-black)',
      }).object,
      ...new TextStyle({
        className: 'text-body',
        fontSize: 'theme(fontSize.base)',
        lineHeight: '1.5',
        letterSpacing: 'theme(letterSpacing.normal)',
        fontWeight: 'theme(fontWeight.normal)',
        color: 'var(--color-content-text, var(--color-neutral-700))',
      }).object,
      ...new TextStyle({
        className: 'text-quote',
        fontSize: 'theme(fontSize.xl)',
        lineHeight: '1.8',
        letterSpacing: 'theme(letterSpacing.normal)',
        fontWeight: 'theme(fontWeight.medium)',
        color: 'var(--color-content-text-muted, var(--color-neutral-500))',
        fontStyle: 'italic',
      }).object,
      ...new TextStyle({
        className: 'text-overline',
        fontSize: 'theme(fontSize.xs)',
        lineHeight: '1.272',
        letterSpacing: 'theme(letterSpacing.widest)',
        fontWeight: 'theme(fontWeight.bold)',
        color: 'var(--color-content-emphasis, --color-black)',
        textTransform: 'uppercase',
      }).object,
      ...new TextStyle({
        className: 'text-code',
        fontSize: 'theme(fontSize.base)',
        lineHeight: '1.2',
        letterSpacing: 'theme(letterSpacing.normal)',
        fontWeight: 'theme(fontWeight.normal)',
        color: 'var(--color-content-emphasis, --color-black)',
        fontFamily: 'theme(fontFamily.mono)',
      }).object,
      ...new TextStyle({
        className: 'text-button',
        fontSize: 'theme(fontSize.base)',
        lineHeight: '1.3',
        letterSpacing: 'theme(letterSpacing.widest)',
        fontWeight: 'theme(fontWeight.medium)',
        color: 'var(--color-content-emphasis, --color-black)',
        textTransform: 'uppercase',
      }).object,
      ...new TextStyle({
        className: 'text-heading-1',
        fontSize: 'theme(fontSize.7xl)',
        lineHeight: '8rem',
        letterSpacing: 'theme(letterSpacing.tighter)',
        fontWeight: 'theme(fontWeight.normal)',
        color: 'var(--color-content-emphasis, --color-black)',
      }).object,
      ...new TextStyle({
        className: 'text-heading-2',
        fontSize: 'theme(fontSize.5xl)',
        lineHeight: '5rem',
        letterSpacing: 'theme(letterSpacing.tighter)',
        fontWeight: 'theme(fontWeight.normal)',
        color: 'var(--color-content-emphasis, --color-black)',
      }).object,
      ...new TextStyle({
        className: 'text-heading-3',
        fontSize: 'theme(fontSize.4xl)',
        lineHeight: '1.8',
        letterSpacing: 'theme(letterSpacing.tight)',
        fontWeight: 'theme(fontWeight.semibold)',
        color: 'var(--color-content-emphasis, --color-black)',
      }).object,
      ...new TextStyle({
        className: 'text-heading-4',
        fontSize: 'theme(fontSize.3xl)',
        lineHeight: '1.5',
        letterSpacing: 'theme(letterSpacing.tight)',
        fontWeight: 'theme(fontWeight.bold)',
        color: 'var(--color-content-emphasis, --color-black)',
      }).object,
      ...new TextStyle({
        className: 'text-heading-5',
        fontSize: 'theme(fontSize.lg)',
        lineHeight: '1.8',
        letterSpacing: 'theme(letterSpacing.normal)',
        fontWeight: 'theme(fontWeight.bold)',
        color: 'var(--color-content-emphasis, --color-black)',
      }).object,
      ...new TextStyle({
        className: 'text-heading-6',
        fontSize: 'theme(fontSize.base)',
        lineHeight: '1.5',
        letterSpacing: 'theme(letterSpacing.normal)',
        fontWeight: 'theme(fontWeight.black)',
        color: 'var(--color-content-emphasis, --color-black)',
      }).object,
    };
  }

  public get themeExtension() {
    return {};
  }

  constructor(options: unknown) {}
}
