import { parse, formatHex, converter } from "culori";
import { TAILWIND_LIGHTNESS } from '@src/color-shades-generator/tailwind-lightness.ts';

const toOklch = converter("oklch");

export function generateColorShades(
  inputColor: string
): string[] {
  const base = toOklch(parse(inputColor));
  if (!base) {
    throw new Error("Invalid color input");
  }

  const { h, c } = base;

  const result: string[] = [];

  let i = 0;
  for (const [step, l] of Object.entries(TAILWIND_LIGHTNESS)) {
    const lightness = Number(l);

    // reduce chroma at extremes
    const chroma =
      step === "50" || step === "950"
        ? c * 0.3
        : c;

    result[i++] = formatHex({
      mode: "oklch",
      l: lightness,
      c: chroma,
      h,
    });
  }

  return result;
}
