import { generateColors } from '@src/colors/generate-colors.ts';
import { TailwindCssSemanticColorsOptions } from '@src/tailwindcss-semantic-colors-options.ts';
import type { Color } from '@src/colors/colors.ts';

describe('generateSurfaceColors', () => {
  const semanticColors = {
    primary: ['var(--color-indigo-50)', 'var(--color-indigo-100)'],
    secondary: ['var(--color-pink-50)', 'var(--color-pink-100)'],
  };

  const expectedColors: Color[] = [
    { name: 'primary', shade: 50, value: 'var(--color-primary-50)' },
    { name: 'primary', shade: 100, value: 'var(--color-primary-100)' },
    { name: 'secondary', shade: 50, value: 'var(--color-secondary-50)' },
    { name: 'secondary', shade: 100, value: 'var(--color-secondary-100)' },
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

    expect(result.colors.length).toBe(0);
  });

  it('should generate all semantic colors', () => {
    const result = generateColors(options);

    for (const expectedColor of expectedColors) {
      expect(result.colors.find((r) => r.name === expectedColor.name && r.shade === expectedColor.shade)).toBeTruthy();
    }
  });
});
