import { generateColors } from '@src/generate-colors.ts';
import { Options } from '@src/options.ts';

export const BASE_COLORS = ['base', 'surface', 'content'];

export class TailwindCssSemanticColorPlugin {
  private readonly options: Options;

  constructor(options: unknown) {
    this.options = new Options(options);
  }

  colors() {
    return generateColors({
      semanticColorMapping: this.options.semanticColors,
      surfaceColorMapping: this.options.surfaceColors,
      contentColorMapping: this.options.contentColors,
    });
  }
}
