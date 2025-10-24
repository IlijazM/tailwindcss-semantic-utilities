import { generateColors } from '@src/colors/generate-colors.ts';
import { TailwindCssSemanticColorsOptions } from '@src/tailwindcss-semantic-colors-options.ts';
import { Color } from '@src/colors/color-type.ts';

describe('generateSurfaceColors', () => {
  const semanticColors = {
    primary: [
      'var(--color-indigo-50)',
      'var(--color-indigo-100)',
      'var(--color-indigo-200)',
      'var(--color-indigo-300)',
      'var(--color-indigo-400)',
      'var(--color-indigo-500)',
      'var(--color-indigo-600)',
      'var(--color-indigo-700)',
      'var(--color-indigo-800)',
      'var(--color-indigo-900)',
      'var(--color-indigo-950)',
    ],
    secondary: [
      'var(--color-pink-50)',
      'var(--color-pink-100)',
      'var(--color-pink-200)',
      'var(--color-pink-300)',
      'var(--color-pink-400)',
      'var(--color-pink-500)',
      'var(--color-pink-600)',
      'var(--color-pink-700)',
      'var(--color-pink-800)',
      'var(--color-pink-900)',
      'var(--color-pink-950)',
    ],
  };

  const expectedColors = [
    new Color('primary', 50, 'var(--color-primary-50)'),
    new Color('primary', 100, 'var(--color-primary-100)'),
    new Color('primary', 200, 'var(--color-primary-200)'),
    new Color('primary', 300, 'var(--color-primary-300)'),
    new Color('primary', 400, 'var(--color-primary-400)'),
    new Color('primary', 500, 'var(--color-primary-500)'),
    new Color('primary', 600, 'var(--color-primary-600)'),
    new Color('primary', 700, 'var(--color-primary-700)'),
    new Color('primary', 800, 'var(--color-primary-800)'),
    new Color('primary', 900, 'var(--color-primary-900)'),
    new Color('primary', 950, 'var(--color-primary-950)'),
    new Color('secondary', 50, 'var(--color-secondary-50)'),
    new Color('secondary', 100, 'var(--color-secondary-100)'),
    new Color('secondary', 200, 'var(--color-secondary-200)'),
    new Color('secondary', 300, 'var(--color-secondary-300)'),
    new Color('secondary', 400, 'var(--color-secondary-400)'),
    new Color('secondary', 500, 'var(--color-secondary-500)'),
    new Color('secondary', 600, 'var(--color-secondary-600)'),
    new Color('secondary', 700, 'var(--color-secondary-700)'),
    new Color('secondary', 800, 'var(--color-secondary-800)'),
    new Color('secondary', 900, 'var(--color-secondary-900)'),
    new Color('secondary', 950, 'var(--color-secondary-950)'),
  ];

  const options = new TailwindCssSemanticColorsOptions({
    semanticColors,
  });

  it('should return empty object if no sematic colors are provided', () => {
    const result = generateColors(
      new TailwindCssSemanticColorsOptions({
        semanticColors: {},
      }),
    );

    expect(result.length).toBe(0);
  });

  it('should generate all semantic colors', () => {
    const result = generateColors(options);

    for (const expectedColor of expectedColors) {
      expect(
        result.find((r) => r.colorName === expectedColor.colorName && r.shade === expectedColor.shade),
      ).toBeTruthy();
    }
  });
});
