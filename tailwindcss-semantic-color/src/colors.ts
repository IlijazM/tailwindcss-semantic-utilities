import { colorSteps, defaultPrimitiveColorMapping, primitiveColors } from './utils';

export const colors: Record<string, string> = {
  ...Object.fromEntries(
    primitiveColors
      .get()
      .flatMap((primitiveColor) => colorSteps.map((colorStep) => [`${primitiveColor}-${colorStep}`, `var(--color-${defaultPrimitiveColorMapping[primitiveColor]}-${colorStep})`])),
  ),
};
