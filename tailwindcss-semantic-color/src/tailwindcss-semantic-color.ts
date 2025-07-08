import plugin from 'tailwindcss/plugin';
import { optionParser } from './options';

export default plugin.withOptions(
  (options) => {
    console.log(options);
    const configuration = optionParser(options);

    console.log(configuration.colors());

    return ({ addBase, addUtilities }) => {
      const base = {};

      for (const [colorName, color] of Object.entries(configuration.primitiveColors)) {
        base[`--color-${colorName}`] = color;
      }

      addBase({
        ':root': base,
      });
    };
  },
  (options) => {
    const configuration = optionParser(options);

    return {
      theme: {
        extend: {
          colors: configuration.colors(),
        },
      },
    };
  },
);
