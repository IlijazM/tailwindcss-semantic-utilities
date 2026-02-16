import { TailwindOptionsWrapper } from '@ilijaz/tailwindcss-core/tailwindcss-options/tailwind-options-wrapper.ts';
import { TailwindOptionsType } from '@ilijaz/tailwindcss-core/tailwindcss-options/tailwind-options-type.ts';
import { SelectableObjectTailwindOption } from '@ilijaz/tailwindcss-core/tailwindcss-options/selectable-object-tailwind-options.ts';
import { stringsToTextStyle } from '@src/text-stlye/strings-to-text-style.ts';
import { ITextStyleType } from '@src/text-stlye/text-style-type.ts';
import { TextStyle } from '@src/text-stlye/text-style.ts';

export const DEFAULT_TYPOGRAPHY_OPTIONS: Record<string, ITextStyleType> = {
  'display-1': stringsToTextStyle([
    'text-7xl',
    'leading-28',
    'tracking-tighter',
    'font-normal',
    'color-[var(--color-content-emphasis, var(--color-black))]',
  ]),
  'display-2': stringsToTextStyle([
    'text-5xl',
    'leading-20',
    'tracking-tighter',
    'font-normal',
    'color-[var(--color-content-emphasis, var(--color-black))]',
  ]),
  heading: stringsToTextStyle([
    'text-3xl',
    'leading-12',
    'tracking-tight',
    'font-medium',
    'color-[var(--color-content-emphasis, var(--color-black))]',
  ]),
  subheading: stringsToTextStyle([
    'text-lg',
    'leading-8',
    'tracking-normal',
    'font-bold',
    'color-[var(--color-content-emphasis, var(--color-black))]',
  ]),
  lead: stringsToTextStyle([
    'text-xl',
    'leading-9',
    'tracking-normal',
    'font-normal',
    'color-[var(--color-content-text-emphasis, var(--color-black))]',
  ]),
  body: stringsToTextStyle([
    'text-base',
    'leading-7',
    'tracking-normal',
    'font-normal',
    'color-[var(--color-content-text, var(--color-neutral-700))]',
  ]),
  quote: stringsToTextStyle([
    'text-xl',
    'leading-7',
    'tracking-normal',
    'font-medium',
    'color-[var(--color-content-text-muted, var(--color-neutral-500))]',
    'italic',
  ]),
  overline: stringsToTextStyle([
    'text-xs',
    'leading-5',
    'tracking-widest',
    'font-bold',
    'color-[var(--color-content-emphasis, var(--color-black))]',
    'uppercase',
  ]),
  button: stringsToTextStyle([
    'text-sm',
    'leading-5',
    'tracking-wide',
    'font-semibold',
    'color-[var(--color-content-emphasis, var(--color-black))]',
    'uppercase',
  ]),
  code: stringsToTextStyle([
    'text-base',
    'leading-5',
    'tracking-normal',
    'font-normal',
    'color-[var(--color-content-emphasis, var(--color-black))]',
    'font-mono',
  ]),
  'heading-1': stringsToTextStyle([
    'text-7xl',
    'leading-[8rem]',
    'tracking-tighter',
    'font-normal',
    'color-[var(--color-content-emphasis, var(--color-black))]',
  ]),
  'heading-2': stringsToTextStyle([
    'text-5xl',
    'leading-20',
    'tracking-tighter',
    'font-normal',
    'color-[var(--color-content-emphasis, var(--color-black))]',
  ]),
  'heading-3': stringsToTextStyle([
    'text-4xl',
    'leading-15',
    'tracking-tight',
    'font-semibold',
    'color-[var(--color-content-emphasis, var(--color-black))]',
  ]),
  'heading-4': stringsToTextStyle([
    'text-3xl',
    'leading-10',
    'tracking-tight',
    'font-bold',
    'color-[var(--color-content-emphasis, var(--color-black))]',
  ]),
  'heading-5': stringsToTextStyle([
    'text-lg',
    'leading-7',
    'tracking-normal',
    'font-bold',
    'color-[var(--color-content-emphasis, var(--color-black))]',
  ]),
  'heading-6': stringsToTextStyle([
    'text-base',
    'leading-6',
    'tracking-normal',
    'font-black',
    'color-[var(--color-content-emphasis, var(--color-black))]',
  ]),
};

export const DEFAULT_FONT_STYLE = [];

interface SemanticTypographyOptionsType {
  typography: Record<string, ITextStyleType>;
}

const semanticTypographyDefaultOptions: TailwindOptionsType<SemanticTypographyOptionsType> = {
  typography: new SelectableObjectTailwindOption<ITextStyleType>(
    DEFAULT_TYPOGRAPHY_OPTIONS,
    (key, value: null | string | string[]) => {
      if (value == null) {
        return [key, value];
      }

      if ((typeof value === "string" && value.includes("*")) || (Array.isArray(value) && value.includes("*"))) {
        return [key, { ...(DEFAULT_TYPOGRAPHY_OPTIONS[key] ?? {}), ...stringsToTextStyle(value) }];
      }

      return [key, stringsToTextStyle(value)];
    },
  ),
};

export class SemanticTypographyOptions extends TailwindOptionsWrapper<SemanticTypographyOptionsType> {
  constructor(options: any) {
    super({ options, defaultOptions: semanticTypographyDefaultOptions });
  }
}
