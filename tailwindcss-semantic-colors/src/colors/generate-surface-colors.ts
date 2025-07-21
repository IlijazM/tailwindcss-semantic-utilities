import { COLOR_TYPE_SURFACE, ColorType } from '../options.ts';
import { ColorVariantGenerator, ColorGenerator } from './color-generator.ts';

interface SurfaceColorMappings extends ColorVariantGenerator {
  variant: string;
  mapping: string;
}

export class GenerateSurfaceColors extends ColorGenerator<SurfaceColorMappings> {
  protected get colorVariants() {
    return Object.entries(this.options.get('surfaceColorSteps')).map(([leftSide, rightSide]) => ({
      leftSide,
      rightSide,
    }));
  }

  protected get colorTypes(): ColorType[] {
    return ['semanticColors', 'surfaceColors'];
  }

  protected generateCssColorVarname(colorType: ColorType, colorVarname: string, step: SurfaceColorMappings): string {
    if (colorType === COLOR_TYPE_SURFACE) {
      return `--color-${colorVarname}${step.variant}`;
    } else {
      return `--color-surface-${colorVarname}${step.variant}`;
    }
  }

  protected generateCssColorValue(
    _colorType: ColorType,
    colorVarname: string,
    _colorValues: string[],
    step: SurfaceColorMappings,
  ): string {
    return `var(--color-${colorVarname}-${step.mapping})`;
  }

  protected generateThemedCssColorValue(
    _colorType: ColorType,
    _colorVarname: string,
    _colorValues: string[],
    _step: SurfaceColorMappings,
    _theme: string,
  ): string | undefined {
    return undefined;
  }
}
