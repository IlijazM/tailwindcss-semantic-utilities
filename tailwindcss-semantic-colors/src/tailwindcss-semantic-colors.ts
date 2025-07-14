import { generateColors } from '@src/generate-colors.ts';
import { TailwindCssSemanticColorsOptions } from './options.ts';

export const BASE_COLORS = ['base', 'surface', 'content'];

export class TailwindCssSemanticColorPlugin {
  private readonly options: TailwindCssSemanticColorsOptions;

  constructor(options: unknown) {
    this.options = new TailwindCssSemanticColorsOptions(options);
  }

  colors() {
    return generateColors(this.options);
  }
}
