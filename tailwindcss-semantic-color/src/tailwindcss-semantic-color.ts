import plugin from 'tailwindcss/plugin';
import { Options } from './options';

export default plugin.withOptions(
  (options) => {
    console.log(options);
    const parsedOptions = new Options(options);

    return ({ addBase, addUtilities }) => {
      const base = {};

      for (const [colorName, color] of Object.entries(parsedOptions.colors())) {
        base[`--color-${colorName}`] = color;
      }

      addBase({
        ':root': base,
      });
    };
  },
  (options) => {
    console.log(options);

    const parsedOptions = new Options(options);

    return {
      theme: {
        extend: {
          colors: parsedOptions.colors(),
        },
      },
    };
  },
);
