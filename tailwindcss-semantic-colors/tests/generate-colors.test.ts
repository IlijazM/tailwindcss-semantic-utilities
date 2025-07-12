import { generateColors } from '@src/generate-colors.ts';

describe('generateSurfaceColors', () => {
  const semanticColorMapping = {
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

  const surfaceColorMapping = {
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

  const contentColorMapping = {};

  const params = {
    semanticColorMapping,
    surfaceColorMapping,
    contentColorMapping,
  };

  it('should generate utility colors', () => {
    const result = generateColors(params);

    // Test utility colors for semanticColorMapping
    expect(result['primary-50']).toBe('var(--color-primary-50)');
    expect(result['primary-100']).toBe('var(--color-primary-100)');
    expect(result['primary-950']).toBe('var(--color-primary-950)');
    expect(result['secondary-50']).toBe('var(--color-secondary-50)');
    expect(result['secondary-100']).toBe('var(--color-secondary-100)');
    expect(result['secondary-950']).toBe('var(--color-secondary-950)');
  });

  it('should generate 22 utility colors', () => {
    const result = generateColors(params);

    const numberOfColors = Object.keys(result).filter((colorName) => /^(primary|secondary)-\d+/.test(colorName)).length;
    expect(numberOfColors).toBe(22);
  });

  it('should generate semantic surface colors', () => {
    const result = generateColors(params);
    expect(result['surface-primary']).toBe('var(--color-primary-100)');
    expect(result['surface-primary-light']).toBe('var(--color-primary-50)');
    expect(result['surface-primary-dark']).toBe('var(--color-primary-200)');
    expect(result['surface-secondary']).toBe('var(--color-secondary-100)');
    expect(result['surface-secondary-light']).toBe('var(--color-secondary-50)');
    expect(result['surface-secondary-dark']).toBe('var(--color-secondary-200)');
  });

  it('should generate 6 semantic surface colors', () => {
    const result = generateColors(params);

    const numberOfColors = Object.keys(result).filter((colorName) =>
      /^surface-(primary|secondary).*/.test(colorName),
    ).length;
    expect(numberOfColors).toBe(6);
  });

  it('should generate surface colors', () => {
    const result = generateColors(params);
    expect(result['surface']).toBe('var(--color-surface-100)');
    expect(result['surface-light']).toBe('var(--color-surface-50)');
    expect(result['surface-dark']).toBe('var(--color-surface-200)');
    expect(result['surface-lightest']).toBe('white');
    expect(result['surface-darkest']).toBe('var(--color-surface-300)');
    expect(result['container']).toBe('var(--color-container-100)');
    expect(result['container-light']).toBe('var(--color-container-50)');
    expect(result['container-dark']).toBe('var(--color-container-200)');
    expect(result['container-lightest']).toBe('white');
    expect(result['container-darkest']).toBe('var(--color-container-300)');
  });

  it('should generate 10 surface colors', () => {
    const result = generateColors(params);

    const numberOfColors = Object.keys(result).filter((colorName) =>
      /^(surface|container)(-light(est)?|-dark(est)?)?$/.test(colorName),
    ).length;
    expect(numberOfColors).toBe(10);
  });

  it('should return empty object if no mappings are provided', () => {
    const result = generateColors({
      semanticColorMapping: {},
      surfaceColorMapping: {},
      contentColorMapping: {},
    });

    expect(Object.keys(result).length).toBe(0);
  });
});
