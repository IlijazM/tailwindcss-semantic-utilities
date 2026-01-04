import { TailwindcssSemanticPaletteOptions } from '@src/options/tailwindcss-semantic-palette-options.ts';
import { type Color, Palette } from '@src/palette/palette.ts';

describe('colors', () => {
  it('should have the correct length', () => {
    const colors = new Palette();

    colors.addColor({ name: 'primary', shade: 50, value: 'var(--color-primary-50)' });
    colors.addColor({ name: 'primary', shade: 100, value: 'var(--color-primary-100)' });
    colors.addColor({ name: 'secondary', shade: 50, value: 'var(--color-secondary-50)' });
    colors.addColor({ name: 'secondary', shade: 100, value: 'var(--color-secondary-100)' });

    expect(colors.colors.length).toBe(4);
  });

  it('should generate css declarations correctly', () => {
    const colors = new Palette();

    colors.addColor({ name: 'primary', shade: 50, value: 'var(--color-primary-50)' });
    colors.addColor({ name: 'primary', shade: 100, value: 'var(--color-primary-100)' });
    colors.addColor({ name: 'secondary', shade: 50, value: 'var(--color-secondary-50)' });
    colors.addColor({ name: 'secondary', shade: 100, value: 'var(--color-secondary-100)' });

    const expectedDeclarations = [
      '--color-primary-50: var(--color-primary-50);',
      '--color-primary-100: var(--color-primary-100);',
      '--color-secondary-50: var(--color-secondary-50);',
      '--color-secondary-100: var(--color-secondary-100);',
    ];

    expect(colors.cssDeclarations).toEqual(expectedDeclarations);
  });

  it('should generate theme extension correctly', () => {
    const colors = new Palette();

    colors.addColor({ name: 'primary', shade: 50, value: 'var(--color-primary-50)' });
    colors.addColor({ name: 'primary', shade: 100, value: 'var(--color-primary-100)' });
    colors.addColor({ name: 'secondary', shade: 50, value: 'var(--color-secondary-50)' });
    colors.addColor({ name: 'secondary', shade: 100, value: 'var(--color-secondary-100)' });

    const expectedThemeExtension = {
      primary: {
        '50': 'var(--color-primary-50)',
        '100': 'var(--color-primary-100)',
      },
      secondary: {
        '50': 'var(--color-secondary-50)',
        '100': 'var(--color-secondary-100)',
      },
    };

    expect(colors.themeExtension).toEqual(expectedThemeExtension);
  });
});
