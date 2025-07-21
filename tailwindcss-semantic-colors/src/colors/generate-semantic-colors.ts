import { COLOR_TYPE_SEMANTIC, ColorType } from '../options.ts';
import { ColorVariantGenerator, ColorGenerator } from './color-generator.ts';

interface SemanticColorSteps extends ColorVariantGenerator {
  variant: string;
  mapping: number;
}

export class GenerateSemanticColors extends ColorGenerator<SemanticColorSteps> {
  protected get colorVariants(): SemanticColorSteps[] {
    return [
      { variant: '', mapping: 600 },
      { variant: '-light', mapping: 500 },
      { variant: '-dark', mapping: 700 },
    ];
  }

  protected get colorTypes(): ColorType[] {
    return [COLOR_TYPE_SEMANTIC];
  }

  protected generateCssColorVarname(_colorType: ColorType, colorVarname: string, step: SemanticColorSteps): string {
    return `--color-${colorVarname}-${step.variant}`;
  }

  protected generateCssColorValue(
    _colorType: ColorType,
    colorVarname: string,
    _colorValues: string[],
    step: SemanticColorSteps,
  ): string {
    return `var(--color-${colorVarname}-${step.mapping})`;
  }

  protected generateThemedCssColorValue(
    colorType: ColorType,
    colorVarname: string,
    colorValues: string[],
    step: SemanticColorSteps,
    theme: string,
  ): string | undefined {
    return this.options.themeOverrides[theme]?.[colorType]?.[colorVarname]?.[step.mapping];
  }
}
