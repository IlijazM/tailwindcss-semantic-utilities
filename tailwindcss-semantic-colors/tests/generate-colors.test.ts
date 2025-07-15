import { generateColors } from '@src/colors/generate-colors.ts';
import { TailwindCssSemanticColorsOptions } from '../src/options.ts';

describe('generateSurfaceColors', () => {
  const semanticColors = {
    primary: [
      'var(--color-primary-50)',
      'var(--color-primary-100)',
      'var(--color-primary-200)',
      'var(--color-primary-300)',
      'var(--color-primary-400)',
      'var(--color-primary-500)',
      'var(--color-primary-600)',
      'var(--color-primary-700)',
      'var(--color-primary-800)',
      'var(--color-primary-900)',
      'var(--color-primary-950)',
    ],
    secondary: [
      'var(--color-secondary-50)',
      'var(--color-secondary-100)',
      'var(--color-secondary-200)',
      'var(--color-secondary-300)',
      'var(--color-secondary-400)',
      'var(--color-secondary-500)',
      'var(--color-secondary-600)',
      'var(--color-secondary-700)',
      'var(--color-secondary-800)',
      'var(--color-secondary-900)',
      'var(--color-secondary-950)',
    ],
  };

  const surfaceColors = {
    surface: [
      'var(--color-surface-50)',
      'var(--color-surface-100)',
      'var(--color-surface-200)',
      'var(--color-surface-300)',
      'var(--color-surface-400)',
      'var(--color-surface-500)',
      'var(--color-surface-600)',
      'var(--color-surface-700)',
      'var(--color-surface-800)',
      'var(--color-surface-900)',
      'var(--color-surface-950)',
    ],
    container: [
      'var(--color-container-50)',
      'var(--color-container-100)',
      'var(--color-container-200)',
      'var(--color-container-300)',
      'var(--color-container-400)',
      'var(--color-container-500)',
      'var(--color-container-600)',
      'var(--color-container-700)',
      'var(--color-container-800)',
      'var(--color-container-900)',
      'var(--color-container-950)',
    ],
  };

  const contentColors = {
    content: [
      'var(--color-neutral-50)',
      'var(--color-neutral-100)',
      'var(--color-neutral-200)',
      'var(--color-neutral-300)',
      'var(--color-neutral-400)',
      'var(--color-neutral-500)',
      'var(--color-neutral-600)',
      'var(--color-neutral-700)',
      'var(--color-neutral-800)',
      'var(--color-neutral-900)',
      'var(--color-neutral-950)',
    ],
  };

  const options = new TailwindCssSemanticColorsOptions({
    semanticColors,
    surfaceColors,
    contentColors,
  });

  it('should return empty object if no mappings are provided', () => {
    const result = generateColors(
      new TailwindCssSemanticColorsOptions({
        semanticColors: {},
        surfaceColors: {},
        contentColors: {},
      }),
    );

    expect(Object.keys(result).length).toBe(0);
  });

  it('should generate utility colors', () => {
    const result = generateColors(options);

    // Test utility colors for semanticColorMapping
    expect(result['--color-primary-50']).toBe('var(--color-primary-50)');
    expect(result['--color-primary-100']).toBe('var(--color-primary-100)');
    expect(result['--color-primary-950']).toBe('var(--color-primary-950)');
    expect(result['--color-secondary-50']).toBe('var(--color-secondary-50)');
    expect(result['--color-secondary-100']).toBe('var(--color-secondary-100)');
    expect(result['--color-secondary-950']).toBe('var(--color-secondary-950)');
  });

  it('should generate 22 utility colors', () => {
    const result = generateColors(options);

    const numberOfColors = Object.keys(result).filter((colorName) =>
      /^--color-(primary|secondary)-\d+/.test(colorName),
    ).length;
    expect(numberOfColors).toBe(22);
  });

  it('should generate semantic surface colors', () => {
    const result = generateColors(options);
    expect(result['--color-surface-primary']).toBe('var(--color-primary-100)');
    expect(result['--color-surface-primary-light']).toBe('var(--color-primary-50)');
    expect(result['--color-surface-primary-dark']).toBe('var(--color-primary-200)');
    expect(result['--color-surface-secondary']).toBe('var(--color-secondary-100)');
    expect(result['--color-surface-secondary-light']).toBe('var(--color-secondary-50)');
    expect(result['--color-surface-secondary-dark']).toBe('var(--color-secondary-200)');
  });

  it('should generate 6 semantic surface colors', () => {
    const result = generateColors(options);

    const numberOfColors = Object.keys(result).filter((colorName) =>
      /^--color-surface-(primary|secondary).*/.test(colorName),
    ).length;
    expect(numberOfColors).toBe(6);
  });

  it('should generate surface colors', () => {
    const result = generateColors(options);
    expect(result['--color-surface']).toBe('var(--color-surface-100)');
    expect(result['--color-surface-light']).toBe('var(--color-surface-50)');
    expect(result['--color-surface-dark']).toBe('var(--color-surface-200)');
    expect(result['--color-surface-lightest']).toBe('white');
    expect(result['--color-surface-darkest']).toBe('var(--color-surface-300)');
    expect(result['--color-container']).toBe('var(--color-container-100)');
    expect(result['--color-container-light']).toBe('var(--color-container-50)');
    expect(result['--color-container-dark']).toBe('var(--color-container-200)');
    expect(result['--color-container-lightest']).toBe('white');
    expect(result['--color-container-darkest']).toBe('var(--color-container-300)');
  });

  it('should generate 10 surface colors', () => {
    const result = generateColors(options);

    const numberOfColors = Object.keys(result).filter((colorName) =>
      /^--color-(surface|container)(-light(est)?|-dark(est)?)?$/.test(colorName),
    ).length;
    expect(numberOfColors).toBe(10);
  });

  it('should generate content colors', () => {
    const result = generateColors(options);

    expect(result['--color-content']).toBe('var(--color-content-900)');
    expect(result['--color-content-muted']).toBe('var(--color-content-800)');
    expect(result['--color-content-emphasis']).toBe('var(--color-black)');
  });

  it('should generate 3 content colors', () => {
    const result = generateColors(options);

    const numberOfColors = Object.keys(result).filter((colorName) =>
      /^--color-content(-muted|-emphasis)?$/.test(colorName),
    ).length;
    expect(numberOfColors).toBe(3);
  });
});
