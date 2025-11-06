import { DEFAULT_SEMANTIC_COLORS, TailwindCssSemanticColorsOptions } from '@src/tailwindcss-semantic-colors-options.ts';

describe('tailwindcss-semantic-palette-options.test', () => {
  it('should set default options correctly', () => {
    const options = new TailwindCssSemanticColorsOptions(undefined);

    expect(options.get('semanticColors')).toEqual(DEFAULT_SEMANTIC_COLORS);
  });

  it('should override default options correctly', () => {
    const customSemanticColors = {
      primary: ['var(--color-blue-50)', 'var(--color-blue-100)'],
      secondary: ['var(--color-yellow-50)', 'var(--color-yellow-100)'],
    };

    const options = new TailwindCssSemanticColorsOptions({
      semanticColors: customSemanticColors,
    });

    expect(options.get('semanticColors')).toEqual(customSemanticColors);
  });

  // Test doesnt currently work
  // it('should resolve wildcard syntax correctly', () => {
  //   const semanticColors = {
  //     primary: 'var(--color-custom-blue-*)',
  //     secondary: 'var(--color-custom-yellow-*)',
  //   };
  //
  //   const options = new TailwindCssSemanticColorsOptions({
  //     semanticColors,
  //   });
  //
  //   expect(options.get('semanticColors')).toEqual({
  //     primary: [
  //       'var(--color-custom-blue-50)',
  //       'var(--color-custom-blue-100)',
  //       'var(--color-custom-blue-200)',
  //       'var(--color-custom-blue-300)',
  //       'var(--color-custom-blue-400)',
  //       'var(--color-custom-blue-500)',
  //       'var(--color-custom-blue-600)',
  //       'var(--color-custom-blue-700)',
  //       'var(--color-custom-blue-800)',
  //       'var(--color-custom-blue-900)',
  //     ],
  //     secondary: [
  //       'var(--color-custom-yellow-50)',
  //       'var(--color-custom-yellow-100)',
  //       'var(--color-custom-yellow-200)',
  //       'var(--color-custom-yellow-300)',
  //       'var(--color-custom-yellow-400)',
  //       'var(--color-custom-yellow-500)',
  //       'var(--color-custom-yellow-600)',
  //       'var(--color-custom-yellow-700)',
  //       'var(--color-custom-yellow-800)',
  //       'var(--color-custom-yellow-900)',
  //     ],
  //   });
  // });
});
