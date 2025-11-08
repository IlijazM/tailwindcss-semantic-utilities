import {
  DEFAULT_SEMANTIC_PALETTE,
  TailwindcssSemanticPaletteOptions,
} from '@src/options/tailwindcss-semantic-palette-options.ts';
import { INVALID_AMOUNT_OF_COLORS_ERROR } from '@src/options/tailwindcss-semantic-palette-options-errors.ts';

describe('tailwindcss-semantic-palette-options.test', () => {
  it('should set default options if no options are provided', () => {
    const options = new TailwindcssSemanticPaletteOptions(undefined);

    expect(options.semanticPalette).toEqual(DEFAULT_SEMANTIC_PALETTE);
  });

  it('should set default options if wildcard is provided', () => {
    const options = new TailwindcssSemanticPaletteOptions({ 'semantic-palette': ['*'] });

    expect(options.semanticPalette).toEqual(DEFAULT_SEMANTIC_PALETTE);
  });

  it('should use a subset of the default semantic palette', () => {
    const options = new TailwindcssSemanticPaletteOptions({ 'semantic-palette': ['primary', 'brand'] });

    const expectedResult = {
      primary: DEFAULT_SEMANTIC_PALETTE['primary'],
      brand: DEFAULT_SEMANTIC_PALETTE['brand'],
    };

    expect(options.semanticPalette).toEqual(expectedResult);
  });

  it('should use custom shades', () => {
    const options = new TailwindcssSemanticPaletteOptions({
      'semantic-palette': ['to-do', 'in-progress', 'done'],
      'semantic-palette--to-do': [
        '#ecfbf3',
        '#c6f2da',
        '#a0eac1',
        '#7be1a9',
        '#55d990',
        '#2fd077',
        '#26aa62',
        '#1e844c',
        '#155f36',
        '#0d3921',
        '#04130b',
      ],
      'semantic-palette--in-progress': [
        'var(--color-sky-50)',
        'var(--color-sky-100)',
        'var(--color-sky-200)',
        'var(--color-sky-300)',
        'var(--color-sky-400)',
        'var(--color-sky-500)',
        'var(--color-sky-600)',
        'var(--color-sky-700)',
        'var(--color-sky-800)',
        'var(--color-sky-900)',
        'var(--color-sky-950)',
      ],
      'semantic-palette--done': [
        'hsl(260, 13%, 95%)',
        'hsl(262, 11%, 86%)',
        'hsl(260, 10%, 77%)',
        'hsl(260, 11%, 68%)',
        'hsl(261, 11%, 59%)',
        'hsl(261, 11%, 50%)',
        'hsl(261, 11%, 41%)',
        'hsl(263, 11%, 32%)',
        'hsl(263, 11%, 23%)',
        'hsl(263, 11%, 14%)',
        'hsl(260, 13%, 5%)',
      ],
    });

    const expectedResult = {
      'to-do': [
        '#ecfbf3',
        '#c6f2da',
        '#a0eac1',
        '#7be1a9',
        '#55d990',
        '#2fd077',
        '#26aa62',
        '#1e844c',
        '#155f36',
        '#0d3921',
        '#04130b',
      ],
      'in-progress': [
        'var(--color-sky-50)',
        'var(--color-sky-100)',
        'var(--color-sky-200)',
        'var(--color-sky-300)',
        'var(--color-sky-400)',
        'var(--color-sky-500)',
        'var(--color-sky-600)',
        'var(--color-sky-700)',
        'var(--color-sky-800)',
        'var(--color-sky-900)',
        'var(--color-sky-950)',
      ],
      done: [
        'hsl(260, 13%, 95%)',
        'hsl(262, 11%, 86%)',
        'hsl(260, 10%, 77%)',
        'hsl(260, 11%, 68%)',
        'hsl(261, 11%, 59%)',
        'hsl(261, 11%, 50%)',
        'hsl(261, 11%, 41%)',
        'hsl(263, 11%, 32%)',
        'hsl(263, 11%, 23%)',
        'hsl(263, 11%, 14%)',
        'hsl(260, 13%, 5%)',
      ],
    };

    expect(options.semanticPalette).toEqual(expectedResult);
  });

  it('should add custom shades if wildcard is provided', () => {
    const options = new TailwindcssSemanticPaletteOptions({
      'semantic-palette': ['*', 'to-do', 'in-progress', 'done'],
      'semantic-palette--to-do': [
        '#ecfbf3',
        '#c6f2da',
        '#a0eac1',
        '#7be1a9',
        '#55d990',
        '#2fd077',
        '#26aa62',
        '#1e844c',
        '#155f36',
        '#0d3921',
        '#04130b',
      ],
      'semantic-palette--in-progress': [
        'var(--color-sky-50)',
        'var(--color-sky-100)',
        'var(--color-sky-200)',
        'var(--color-sky-300)',
        'var(--color-sky-400)',
        'var(--color-sky-500)',
        'var(--color-sky-600)',
        'var(--color-sky-700)',
        'var(--color-sky-800)',
        'var(--color-sky-900)',
        'var(--color-sky-950)',
      ],
      'semantic-palette--done': [
        'hsl(260, 13%, 95%)',
        'hsl(262, 11%, 86%)',
        'hsl(260, 10%, 77%)',
        'hsl(260, 11%, 68%)',
        'hsl(261, 11%, 59%)',
        'hsl(261, 11%, 50%)',
        'hsl(261, 11%, 41%)',
        'hsl(263, 11%, 32%)',
        'hsl(263, 11%, 23%)',
        'hsl(263, 11%, 14%)',
        'hsl(260, 13%, 5%)',
      ],
    });

    const expectedResult = {
      ...DEFAULT_SEMANTIC_PALETTE,
      'to-do': [
        '#ecfbf3',
        '#c6f2da',
        '#a0eac1',
        '#7be1a9',
        '#55d990',
        '#2fd077',
        '#26aa62',
        '#1e844c',
        '#155f36',
        '#0d3921',
        '#04130b',
      ],
      'in-progress': [
        'var(--color-sky-50)',
        'var(--color-sky-100)',
        'var(--color-sky-200)',
        'var(--color-sky-300)',
        'var(--color-sky-400)',
        'var(--color-sky-500)',
        'var(--color-sky-600)',
        'var(--color-sky-700)',
        'var(--color-sky-800)',
        'var(--color-sky-900)',
        'var(--color-sky-950)',
      ],
      done: [
        'hsl(260, 13%, 95%)',
        'hsl(262, 11%, 86%)',
        'hsl(260, 10%, 77%)',
        'hsl(260, 11%, 68%)',
        'hsl(261, 11%, 59%)',
        'hsl(261, 11%, 50%)',
        'hsl(261, 11%, 41%)',
        'hsl(263, 11%, 32%)',
        'hsl(263, 11%, 23%)',
        'hsl(263, 11%, 14%)',
        'hsl(260, 13%, 5%)',
      ],
    };

    expect(options.semanticPalette).toEqual(expectedResult);
  });

  it('should used custom constant colors', () => {
    const options = new TailwindcssSemanticPaletteOptions({
      'semantic-palette': ['almost-black', 'almost-white'],
      'semantic-palette--almost-black': ['#111'],
      'semantic-palette--almost-white': ['#eee'],
    });

    const expectedResult = {
      'almost-black': ['#111', '#111', '#111', '#111', '#111', '#111', '#111', '#111', '#111', '#111', '#111'],
      'almost-white': ['#eee', '#eee', '#eee', '#eee', '#eee', '#eee', '#eee', '#eee', '#eee', '#eee', '#eee'],
    };

    expect(options.semanticPalette).toEqual(expectedResult);
  });

  it('should fail if there is not exactly 11 or 1 color in the array', () => {
    expect(
      () =>
        new TailwindcssSemanticPaletteOptions({
          'semantic-palette': ['invalid-palette'],
          'semantic-palette--invalid-palette': ['#111', '#222', '#333'],
        }),
    ).toThrow(INVALID_AMOUNT_OF_COLORS_ERROR);
  });

  it('should resolve wildcard syntax correctly', () => {
    const options = new TailwindcssSemanticPaletteOptions({
      'semantic-palette': ['brand'],
      'semantic-palette--brand': 'var(--color-custom-blue-*)',
    });

    const expectedResult = {
      brand: [
        'var(--color-custom-blue-50)',
        'var(--color-custom-blue-100)',
        'var(--color-custom-blue-200)',
        'var(--color-custom-blue-300)',
        'var(--color-custom-blue-400)',
        'var(--color-custom-blue-500)',
        'var(--color-custom-blue-600)',
        'var(--color-custom-blue-700)',
        'var(--color-custom-blue-800)',
        'var(--color-custom-blue-900)',
        'var(--color-custom-blue-950)',
      ],
    };

    expect(options.semanticPalette).toEqual(expectedResult);
  });

  it('should resolve wildcard syntax correctly even without var', () => {
    const options = new TailwindcssSemanticPaletteOptions({
      'semantic-palette': ['brand'],
      'semantic-palette--brand': '--color-custom-blue-*',
    });

    const expectedResult = {
      brand: [
        'var(--color-custom-blue-50)',
        'var(--color-custom-blue-100)',
        'var(--color-custom-blue-200)',
        'var(--color-custom-blue-300)',
        'var(--color-custom-blue-400)',
        'var(--color-custom-blue-500)',
        'var(--color-custom-blue-600)',
        'var(--color-custom-blue-700)',
        'var(--color-custom-blue-800)',
        'var(--color-custom-blue-900)',
        'var(--color-custom-blue-950)',
      ],
    };

    expect(options.semanticPalette).toEqual(expectedResult);
  });

  it('should use a combination of options', () => {
    const options = new TailwindcssSemanticPaletteOptions({
      'semantic-palette': ['primary', 'secondary', 'brand', 'brand-secondary'],
      'semantic-palette--secondary': 'var(--color-yellow-*)',
      'semantic-palette--brand': [
        '#ecfbf3',
        '#c6f2da',
        '#a0eac1',
        '#7be1a9',
        '#55d990',
        '#2fd077',
        '#26aa62',
        '#1e844c',
        '#155f36',
        '#0d3921',
        '#04130b',
      ],
      'semantic-palette--brand-secondary': ['#111'],
    });

    const expectedResult = {
      primary: DEFAULT_SEMANTIC_PALETTE['primary'],
      secondary: [
        'var(--color-yellow-50)',
        'var(--color-yellow-100)',
        'var(--color-yellow-200)',
        'var(--color-yellow-300)',
        'var(--color-yellow-400)',
        'var(--color-yellow-500)',
        'var(--color-yellow-600)',
        'var(--color-yellow-700)',
        'var(--color-yellow-800)',
        'var(--color-yellow-900)',
        'var(--color-yellow-950)',
      ],
      brand: [
        '#ecfbf3',
        '#c6f2da',
        '#a0eac1',
        '#7be1a9',
        '#55d990',
        '#2fd077',
        '#26aa62',
        '#1e844c',
        '#155f36',
        '#0d3921',
        '#04130b',
      ],
      'brand-secondary': ['#111', '#111', '#111', '#111', '#111', '#111', '#111', '#111', '#111', '#111', '#111'],
    };

    expect(options.semanticPalette).toEqual(expectedResult);
  });
});
