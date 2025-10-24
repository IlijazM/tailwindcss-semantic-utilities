import { generateColors } from '@/src/colors/generate-colors.ts';
import { TailwindCssSemanticColorsOptions } from './tailwindcss-semantic-colors-options.ts';

export class TailwindCssSemanticColorPlugin {
  private readonly options: TailwindCssSemanticColorsOptions;

  constructor(options: unknown) {
    this.options = new TailwindCssSemanticColorsOptions(options);
  }

  colors() {
    return generateColors(this.options);
  }

}
