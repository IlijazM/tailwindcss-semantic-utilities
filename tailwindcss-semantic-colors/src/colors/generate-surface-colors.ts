import { COLOR_TYPE_SURFACE, COLOR_TYPES } from '../options.ts';
import { ColorMapping, GenerateColors } from './abstract-generate-colors.ts';

interface SurfaceColorMappings extends ColorMapping {
  leftSide: string;
  rightSide: string;
}

export class GenerateSurfaceColors extends GenerateColors<SurfaceColorMappings> {
  protected get mapping() {
    return Object.entries(this.options.get('surfaceColorSteps')).map(([leftSide, rightSide]) => ({
      leftSide,
      rightSide,
    }));
  }

  protected get colorTypes(): COLOR_TYPES[] {
    return ['semanticColors', 'surfaceColors'];
  }

  protected generateCssColorVarname(colorType: COLOR_TYPES, colorVarname: string, step: SurfaceColorMappings): string {
    if (colorType === COLOR_TYPE_SURFACE) {
      return `--color-${colorVarname}${step.leftSide}`;
    } else {
      return `--color-surface-${colorVarname}${step.leftSide}`;
    }
  }

  protected generateCssColorValue(
    _colorType: COLOR_TYPES,
    colorVarname: string,
    _colorValues: string[],
    step: SurfaceColorMappings,
  ): string {
    return `var(--color-${colorVarname}-${step.rightSide})`;
  }

  protected generateThemedCssColorValue(
    _colorType: COLOR_TYPES,
    _colorVarname: string,
    _colorValues: string[],
    _step: SurfaceColorMappings,
    _theme: string,
  ): string | undefined {
    return undefined;
  }
}
