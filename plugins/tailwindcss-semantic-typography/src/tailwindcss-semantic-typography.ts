import { TextStyle } from '@src/text-stlye/text-style.ts';
import { SemanticTypographyOptions } from '@src/options/semantic-typography-options.ts';

export class TailwindCssSemanticTypographyPlugin {
  public get utilities() {
    return {
      ...Object.fromEntries(
        Object.entries(this.options.get('typography')).flatMap(([className, style]) =>
          Object.entries({
            ...new TextStyle({ className, style }).cssDeclarations,
          }),
        ),
      ),
    };
  }

  public get base() {
    return {
      ':root': Object.fromEntries(
        Object.entries(this.options.get('typography')).flatMap(([className, style]) =>
          Object.entries({
            ...new TextStyle({ className, style }).cssRoot,
          }),
        ),
      ),
    };
  }

  public get themeExtension() {
    return {
      // textStyle: Object.fromEntries(
      //     Object.entries(this.options.semanticTypography).flatMap(([className, style]) => (Object.entries({
      //         ...new TextStyle({className, style}).cssRoot,
      //     })))
      // )
    };
  }

  private readonly options: SemanticTypographyOptions;

  constructor(options: unknown) {
    this.options = new SemanticTypographyOptions(options);
  }
}
