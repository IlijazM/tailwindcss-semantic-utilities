import { TailwindColorShade } from '@src/tailwindcss-color-shades.ts';

export interface Color {
  name: string;
  shade: TailwindColorShade;
  value: string;
}

/**
 * Holds a collection of palette and provides methods to generate
 * CSS variable declarations and Tailwind CSS theme extensions.
 */
export class Palette {
  /**
   * Constructs CSS variable declarations for all palette.
   *
   * Used for generating :root CSS variables in Tailwind CSS.
   *
   * Example output:
   *
   * ```typescript
   * ["--color-primary-50: var(--color-indigo-50)", "--color-primary-100: var(--color-indigo-100)", ...]
   * ```
   *
   * Example usage in CSS:
   *
   * ```typescript
   * addBase({
   *   ':root': palette.cssDeclarations,
   * });
   * ```
   *
   * @return {Record<string, string>} Object of CSS variable declarations.
   */
  get cssDeclarations(): Record<string, string> {
    return Object.fromEntries(this.colors.map((color) => [`--color-${color.name}-${color.shade}`, color.value]));
  }

  /**
   * Constructs a nested theme object for all palette.
   *
   * Used for extending Tailwind CSS theme palette.
   *
   * Example output:
   *
   * ```typescript
   * {
   *  primary: {
   *    "50": "var(--color-indigo-50)",
   *    "100": "var(--color-indigo-100)",
   *    ...
   *  },
   *  secondary: {
   *    "50": "var(--color-pink-50)",
   *    "100": "var(--color-pink-100)",
   *    ...
   *  },
   * }
   * ```
   *
   * Example usage in Tailwind CSS config:
   *
   * ```typescript
   * return {
   *  theme: {
   *    extend: {
   *      palette: palette.themeExtension,
   *    },
   *  },
   * };
   * ```
   *
   * @return {Record<string, Record<string, string>>} Nested theme object.
   */
  get themeExtension() {
    const theme: Record<string, Record<string, string>> = {};

    for (const color of this.colors) {
      if (!(color.name in theme)) {
        theme[color.name] = {};
      }
      theme[color.name]![color.shade] = color.value;
    }

    return theme;
  }

  readonly colors: Color[] = [];

  /**
   * Adds a new color to the collection.
   *
   * Example usage:
   *
   * ```typescript
   * palette.addColor({ name: 'primary', shade: '500', value: 'var(--color-indigo-500)' });
   * ```
   *
   * @param color {Color} The color to add.
   */
  addColor(color: Color) {
    this.colors.push(color);
  }
}
