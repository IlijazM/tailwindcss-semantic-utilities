import { generatePalette } from '@src/palette/generate-palette.ts';
import { TailwindcssSemanticPaletteOptions } from '@src/options/tailwindcss-semantic-palette-options.ts';
import type { Color } from '@src/palette/palette.ts';

describe('generate-palette', () => {
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

  const expectedColors: Color[] = [
    { name: 'primary', shade: 50, value: 'var(--color-primary-50)' },
    { name: 'primary', shade: 100, value: 'var(--color-primary-100)' },
    { name: 'primary', shade: 200, value: 'var(--color-primary-200)' },
    { name: 'primary', shade: 300, value: 'var(--color-primary-300)' },
    { name: 'primary', shade: 400, value: 'var(--color-primary-400)' },
    { name: 'primary', shade: 500, value: 'var(--color-primary-500)' },
    { name: 'primary', shade: 600, value: 'var(--color-primary-600)' },
    { name: 'primary', shade: 700, value: 'var(--color-primary-700)' },
    { name: 'primary', shade: 800, value: 'var(--color-primary-800)' },
    { name: 'primary', shade: 900, value: 'var(--color-primary-900)' },
    { name: 'primary', shade: 950, value: 'var(--color-primary-950)' },

    { name: 'secondary', shade: 50, value: 'var(--color-secondary-50)' },
    { name: 'secondary', shade: 100, value: 'var(--color-secondary-100)' },
    { name: 'secondary', shade: 200, value: 'var(--color-secondary-200)' },
    { name: 'secondary', shade: 300, value: 'var(--color-secondary-300)' },
    { name: 'secondary', shade: 400, value: 'var(--color-secondary-400)' },
    { name: 'secondary', shade: 500, value: 'var(--color-secondary-500)' },
    { name: 'secondary', shade: 600, value: 'var(--color-secondary-600)' },
    { name: 'secondary', shade: 700, value: 'var(--color-secondary-700)' },
    { name: 'secondary', shade: 800, value: 'var(--color-secondary-800)' },
    { name: 'secondary', shade: 900, value: 'var(--color-secondary-900)' },
    { name: 'secondary', shade: 950, value: 'var(--color-secondary-950)' },
  ];

  const options = new TailwindcssSemanticPaletteOptions({
    semanticColors,
  });

  it('should return empty object if no sematic palette are provided', () => {
    const result = generatePalette(
      new TailwindcssSemanticPaletteOptions({
        semanticPalette: {},
      }),
    );

    expect(result.colors.length).toBe(0);
  });

  it('should generate all semantic palette', () => {
    const result = generatePalette(options);

    for (const expectedColor of expectedColors) {
      expect(result.colors.find((r) => r.name === expectedColor.name && r.shade === expectedColor.shade)).toBeTruthy();
    }
  });
});
