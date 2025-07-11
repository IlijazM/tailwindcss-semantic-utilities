/**
 * Attempts to parse a `colorValue` to a color value array and returns the color value array if it succeeds.
 *
 * A `colorValue` is a color value array if it has the following syntax:
 *
 * 1. It is a valid json
 * 1. It is an array
 * 1. It has exactly eleven entries
 * 1. It only contains strings
 * 1. All of the strings are trimmed
 * 1. None of the strings are empty
 *
 * @example of a valid color value array syntax.
 * ```json
 * [
 *   "<color1>",
 *   "<color2>",
 *   "<color3>",
 *   "<color4>",
 *   "<color5>",
 *   "<color6>",
 *   "<color7>",
 *   "<color8>",
 *   "<color9>",
 *   "<color10>",
 *   "<color11>"
 * ]
 * ```
 *
 * This function has three cases:
 *
 * 1. `colorValue` does not get parsed into a color value array because it is of the wrong syntax in which case `false`
 * gets returned.
 * 2.`colorValue` successfully got parsed into a color value array in which case the color value array gets returned.
 * 3. An error gets thrown because `colorValue` is of the syntax of a color value array but the syntax is incorrect.
 */
export default function attemptToParseColorValueArray(colorValue: string): string[] | false {
  if (!couldBeColorValueArray(colorValue)) {
    // Case 1.
    return false;
  }

  try {
    // Case 2.
    return parseAndValidateColorValueToColorValueArray(colorValue);
  } catch (error) {
    // only attempt to repair `colorValue` if the exception is a `ColorValueArraySyntaxException`.
    if (!(error instanceof ColorValueArraySyntaxException)) {
      throw error;
    }

    // The syntax is incorrect. Attempt to fix it.
    const repairedColorValue = repairColorValue(colorValue);

    // Case 2 and 3.
    // this throws an error if the syntax is still incorrect.
    return parseAndValidateColorValueToColorValueArray(repairedColorValue);
  }
}

/**
 * Utility function for `console.warn`.
 *
 * @param message message to log
 */
function repairWarning(message: string) {
  console.warn(`[tailwindcss-semantic-colors] Warning: ${message}`);
}

/**
 * Attempts to repair the inputted `colorValue` into the correct syntax so that it can be parsed as a color value array
 * successfully.
 *
 * The following repair steps are done:
 *
 * 1. Normalizes all quotes do be double quotes
 * 1. Replaces the semicolon delimiter with a comma instead
 * 1. If no quotes are used at all attempt to insert quotes where items are separated by comma or space
 * 1. If items are just separated by spaces separate them with commas as well
 * 1. Trims all strings
 * 1. Removes empty strings
 * 1. Removes trailing commas
 *
 * This function also warns the user if the syntax is incorrect and states that the warnings are getting resolved
 * automatically.
 *
 * @param colorValue the incorrect syntax that should be repaired.
 * @returns a repaired version of `colorValue`
 */
export function repairColorValue(colorValue: string): string {
  repairWarning('The provided color value array syntax was incorrect and has been automatically repaired.');

  let repaired = colorValue.trim();

  // Step 1: Warn and normalize all single quotes to double quotes
  if (colorValue.includes("'")) {
    repaired = colorValue.trim().replace(/'/g, '"');
    repairWarning('Single quotes detected in color value array. Normalizing to double quotes.');
  }

  // Step 2: Warn and replace semicolons with commas
  if (repaired.includes(';')) {
    repairWarning('Semicolons detected in color value array. Replacing with commas.');
    repaired = repaired.replace(/;/g, ',');
  }

  // Step 3: Warn and add quotes if none are present
  if (!repaired.includes('"')) {
    repairWarning('No quotes detected in color value array. Attempting to add quotes around items.');
    // Remove brackets for easier processing
    let inner = repaired.slice(1, -1).trim();

    // Split by comma or whitespace
    let items = inner.split(/[\s,]+/).filter(Boolean);

    // Add quotes and join with commas
    inner = items.map((item) => `"${item.trim()}"`).join(', ');

    repaired = `[${inner}]`;
  }

  // Step 4: Warn and replace space-separated items with commas
  const spaceSeparatedArray = /\[\s*([^\]]+)\s*\]/.exec(repaired);
  if (spaceSeparatedArray?.[1] && !spaceSeparatedArray[1].includes(',')) {
    repairWarning('Items in color value array are separated by spaces. Replacing with commas.');
    const items = spaceSeparatedArray[1]
      .split(/\s+/)
      .filter(Boolean)
      .map((s) => s.trim());

    repaired = `[${items.map((item) => `"${item}"`).join(', ')}]`;
  }

  // Step 5: Remove extra whitespace inside the array
  repaired = repaired.replace(/\s*,\s*/g, ', ');

  // Step 6: Warn and remove empty strings
  if (/"(\s*)"/.test(repaired)) {
    repairWarning('Empty strings detected in color value array. Removing empty strings.');
    repaired = repaired.replace(/"(\s*)"/g, '').replace(/,\s*,/g, ',');
  }

  // Step 7: Remove trailing commas
  repaired = repaired.replace(/,(\s*)\]/g, ']');

  return repaired;
}

/**
 * Validates that the inputted colorValue is a color value array.
 *
 * The purpose of this function is to trigger a self repair and also to check if an exception should be thrown because
 * of an incorrect syntax and to decide if `colorValue` should not be treated as an color value array at all.
 *
 * "Could" be means that it is likely the user intended to use input a color value array but made a mistake in the
 * syntax. When `colorValue` "could" be a color value array it will be checked if the syntax is correct. If not it will
 * try to self repair itself. If the self repair fails an exception gets thrown.
 *
 * In order to check if `colorValue` could be a color value array this function checks if it starts and ends with square
 * brackets.
 *
 * @param colorValue the string to check if it could be a color value array.
 * @returns true, of the exception `colorValue` could be a color value array.
 */
export function couldBeColorValueArray(colorValue: string): boolean {
  const trimmedColorValue = colorValue.trim();

  return trimmedColorValue.startsWith('[') && trimmedColorValue.endsWith(']');
}

/**
 * Parses the exception `colorValue` into a color value array and validates the output.
 *
 * @see parseColorValueToColorValueArray
 * @see validateColorValueArray
 * @param colorValue the color value array to parse and validate.
 */
export function parseAndValidateColorValueToColorValueArray(colorValue: string): string[] {
  const colorValueArrayJson = parseColorValueToColorValueArray(colorValue);
  return validateColorValueArray(colorValueArrayJson);
}

/**
 * Parses `colorValue` to json.
 *
 * @param colorValue the color value to parse into a color value array.
 * @returns the color value array parsed to json
 */
export function parseColorValueToColorValueArray(colorValue: string): any {
  try {
    return JSON.parse(colorValue);
  } catch (error) {
    throw new ColorValueArraySyntaxException("'JSON.parse' failed.");
  }
}

/**
 * Validates that a color value array that just got parsed from a json string has the correct format.
 *
 * The following validations happen:
 *
 * 1. It is an array
 * 1. It has exactly eleven entries
 * 1. It only contains strings
 * 1. All of the strings are trimmed
 * 1. None of the strings are empty
 *
 * A color value array must have exactly eleven string.
 *
 * @param parsedJson the just parsed json string to validate
 * @returns a valid color value array.
 * @throws {ColorValueArraySyntaxException} if a validation fails
 */
export function validateColorValueArray(parsedJson: any): string[] {
  throw 'not implemented';
}

/**
 * Exception thrown when a color value array fails to parse or validate due to incorrect syntax.
 */

export class ColorValueArraySyntaxException extends Error {
  constructor(reason: string | null = null) {
    let extendedReason = reason ? `: ${reason}` : '';
    super(`Failed to parse to color value array${extendedReason}`);
  }
}
