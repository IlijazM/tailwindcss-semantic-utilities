import { oklch, formatCss, parse, interpolate, formatHex } from 'culori';

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

/**
 * Generates Tailwind-style shades from a base color.
 * Base color becomes 500.
 */
export function generateColorShades(base: string): string[] {
  const baseColor = oklch(parse(base));
  if (!baseColor) throw new Error(`Invalid color to generate shades: ${base}`);

  const light = { ...baseColor, l: Math.min(0.98, baseColor.l + 0.35) };
  const dark = { ...baseColor, l: Math.max(0.08, baseColor.l - 0.45) };

  const scale = interpolate([light, baseColor, dark], 'oklch');

  return SHADES.map((_, i) => {
    const t = i / (SHADES.length - 1);
    return formatCss(scale(t));
  });
}

export function toHexColor(color: string): string {
  return formatHex(parse(color)) ?? '#000';
}
