import { generateColors } from './generate-colors';
import { Options } from './options';

export type TailwindCssTheme = (path: string, defaultValue?: any) => any;

export const BASE_COLORS = ['base', 'surface', 'content'];

export class TailwindCssSemanticColorPlugin {
  private readonly options: Options;

  constructor(options: unknown, private theme: TailwindCssTheme) {
    this.options = new Options(options);
  }

  colors() {
    return generateColors(this.options.semanticColors, this.options.surfaceColors, this.options.contentColors);
  }
}
