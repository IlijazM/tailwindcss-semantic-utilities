import { TextStyle } from '@src/text-stlye/text-style.ts';
import { SemanticTypographyOptions } from '@src/options/semantic-typography-options.ts';

export class TailwindCssSemanticTypographyPlugin {
  public get utilities() {
    return {
      ...Object.fromEntries(
        Object.entries(this.options.get('typography')).flatMap(([className, style]) =>
          Object.entries({
            ...new TextStyle({ className, style }).utilities,
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

      ...Object.fromEntries(
        Object.entries(this.options.get('typography')).flatMap(([className, style]) =>
          Object.entries({
            ...new TextStyle({ className, style }).getBase(),
          }),
        ),
      ),
    };
  }

  public get variants(): string[][] {
    return [
      [`next-text-any`, `&:has(+[class^=text-])`],
      [`prev-text-any`, `[class^=text-] + &`],
      ...Object.entries(this.options.get('typography')).flatMap(
        ([className, style]) => new TextStyle({ className, style }).variants,
      ),
    ];
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
