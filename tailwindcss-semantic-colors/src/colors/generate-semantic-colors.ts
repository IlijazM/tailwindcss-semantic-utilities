import { COLOR_TYPE_SEMANTIC, ColorType } from '../options.ts';
import { ColorMapping, GenerateColors } from './abstract-generate-colors.ts';

interface SemanticColorSteps extends ColorMapping {
  leftSide: string;
  rightSide: number;
}

export class GenerateSemanticColors extends GenerateColors<SemanticColorSteps> {
  protected get mapping(): SemanticColorSteps[] {
    return [
      { leftSide: '', rightSide: 600 },
      { leftSide: '-light', rightSide: 500 },
      { leftSide: '-dark', rightSide: 700 },
    ];
  }

  protected get colorTypes(): ColorType[] {
    return [COLOR_TYPE_SEMANTIC];
  }

  protected generateCssColorVarname(_colorType: ColorType, colorVarname: string, step: SemanticColorSteps): string {
    return `--color-${colorVarname}-${step.leftSide}`;
  }

  protected generateCssColorValue(
    _colorType: ColorType,
    colorVarname: string,
    _colorValues: string[],
    step: SemanticColorSteps,
  ): string {
    return `var(--color-${colorVarname}-${step.rightSide})`;
  }

  protected generateThemedCssColorValue(
    colorType: ColorType,
    colorVarname: string,
    colorValues: string[],
    step: SemanticColorSteps,
    theme: string,
  ): string | undefined {
    return this.options.themeOverrides[theme]?.[colorType]?.[colorVarname]?.[step.rightSide];
  }
}
