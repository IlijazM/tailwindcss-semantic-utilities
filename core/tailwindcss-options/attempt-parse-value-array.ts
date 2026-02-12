/**
 * Attempts to parse a `colorValue` to a color value array and returns the color value array if it succeeds.
 *
 * A `colorValue` is a color value array if it has the following syntax:
 *
 * 1. It is a valid json
 * 1. It is an array
 * 1. It has exactly eleven entries
 * 1. It only contains strings
 * 1. All the strings are trimmed
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
export function attemptParseValueArray(colorValue: string): string[] | false {
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
  // eslint-disable-next-line
  console.warn(`[tailwindcss-semantic-colors] Warning: ${message}`);
}

/**
 * Attempts to repair the inputted `colorValue` into the correct syntax so that it can be parsed as a color value array
 * successfully.
 *
 * The following repair steps are done:
 *
 * 1. Normalizes all quotes do be double quotes
 * 2. Replaces the semicolon delimiter with a comma instead
 * 3. If no quotes are used at all attempt to insert quotes where items are separated by comma or space
 * 4. If items are just separated by spaces separate them with commas as well
 * 5. Trims all strings
 * 6. Removes empty strings
 * 7. Removes trailing commas
 *
 * This function also warns the user if the syntax is incorrect and states that the warnings are getting resolved
 * automatically.
 *
 * @param colorValue the incorrect syntax that should be repaired.
 * @returns a repaired version of `colorValue`
 */
function repairColorValue(colorValue: string): string {
  repairWarning('The provided color value array syntax was incorrect and has been automatically repaired.');

  let repaired = colorValue.trim();

  repaired = normalizeQuotes(repaired);
  repaired = replaceSemicolonsWithCommas(repaired);
  repaired = addQuotesIfMissing(repaired);
  repaired = replaceSpaceSeparatedItemsWithCommas(repaired);
  repaired = removeExtraWhitespace(repaired);
  repaired = removeEmptyStrings(repaired);
  repaired = removeTrailingCommas(repaired);

  return repaired;
}

/**
 * Step 1: Normalizes all quotes to double quotes.
 *
 * Only replaces quotes that are used as array item delimiters, not quotes inside quoted strings.
 * Warns if different quotes are detected.
 *
 * If the input starts with [ and ends with ], and there are more than 22 "wrong quotes" (single, backtick, acute),
 * then only replace wrapping quotes around array items.
 *
 * @param input The color value string.
 * @returns The string with normalized quotes.
 */
function normalizeQuotes(input: string): string {
  const wrongQuoteRegex = /(['`´])/g;
  const wrongQuotesCount = (input.match(wrongQuoteRegex) || []).length;

  // Only normalize if input starts with [ and ends with ], and there are more than 22 wrong quotes
  if (wrongQuotesCount > 22 && /^\[\s*['`´]/.test(input) && /['`´]\s*\]$/.test(input)) {
    // Replace only quotes that are directly wrapping array items, not those inside the string
    // Handles multiple items in the array: ['item1', 'item2', ...]
    const normalized = input.replace(/(['`´])([^"'`´[\],]*?)\1/g, (match, quote, content) => {
      if (quote !== '"') {
        repairWarning(
          'Quotations other than double quotes detected in color value array. Normalizing to double quotes.',
        );
      }
      return `"${content}"`;
    });
    return normalized;
  }

  // Otherwise, replace any non-double quotes wrapping array items
  const normalized = input.replace(/(["'`´])([^"'`´[\],]*?)\1/g, (match, quote, content) => {
    if (quote !== '"') {
      repairWarning('Quotations other than double quotes detected in color value array. Normalizing to double quotes.');
    }
    return `"${content}"`;
  });
  return normalized;
}

/**
 * Step 2: Replaces semicolons with commas.
 * Warns if semicolons are detected.
 * @param input The color value string.
 * @returns The string with semicolons replaced by commas.
 */
function replaceSemicolonsWithCommas(input: string): string {
  if (input.includes(';')) {
    repairWarning('Semicolons detected in color value array. Replacing with commas.');
    return input.replace(/;/g, ',');
  }
  return input;
}

/**
 * Step 3: Adds quotes around items if none are present.
 * Warns if no quotes are detected.
 * @param input The color value string.
 * @returns The string with quotes added around items.
 */
function addQuotesIfMissing(input: string): string {
  if (!input.includes('"')) {
    repairWarning('No quotes detected in color value array. Attempting to add quotes around items.');
    let inner = input.slice(1, -1).trim();
    let items = inner.split(/[\s,]+/).filter(Boolean);
    inner = items.map((item) => `"${item.trim()}"`).join(', ');
    return `[${inner}]`;
  }
  return input;
}

/**
 * Step 4: Replaces space-separated items with commas if no commas are present.
 * Warns if items are separated by spaces.
 * @param input The color value string.
 * @returns The string with space-separated items replaced by commas.
 */
function replaceSpaceSeparatedItemsWithCommas(input: string): string {
  const spaceSeparatedArray = /\[\s*([^\]]+)\s*\]/.exec(input);
  if (spaceSeparatedArray?.[1] && !spaceSeparatedArray[1].includes(',')) {
    repairWarning('Items in color value array are separated by spaces. Replacing with commas.');
    const items = spaceSeparatedArray[1]
      .split(/\s+/)
      .filter(Boolean)
      .map((s) => s.trim());
    return `[${items.map((item) => `"${item}"`).join(', ')}]`;
  }
  return input;
}

/**
 * Step 5: Removes extra whitespace inside the array.
 *
 * @param input The color value string.
 * @returns The string with extra whitespace removed.
 */
function removeExtraWhitespace(input: string): string {
  // Find all items inside double quotes
  const matches = input.match(/"((?:[^"\\]|\\")*)"/g);
  if (!matches) {
    return input;
  }

  // Trim each item and reinsert
  const trimmedItems = matches.map((item) => `"${item.replace(/^"|"$/g, '').trim()}"`);

  // Replace the original quoted items with trimmed ones
  let result = input;
  matches.forEach((original, idx) => {
    const replacement = trimmedItems[idx] ?? '';
    result = result.replace(original, replacement);
  });

  if (input !== result) {
    repairWarning('Extra whitespace detected in color value array. Removing extra whitespace.');
  }
  return result;
}

/**
 * Step 6: Removes empty strings from the array.
 * Warns if empty strings are detected.
 * @param input The color value string.
 * @returns The string with empty strings removed.
 */
function removeEmptyStrings(input: string): string {
  // Remove empty strings, but do not remove escaped quotes (e.g. \" or \\")
  // Match only empty quoted strings not preceded by a backslash
  if (/([^\\])"(\s*)"/.test(input) || /^\s*"(\s*)"/.test(input)) {
    repairWarning('Empty strings detected in color value array. Removing empty strings.');
    // Replace empty quoted strings not preceded by a backslash
    input = input.replace(/([^\\])"(\s*)"/g, '$1').replace(/^\s*"(\s*)"/, '');
    // Remove double commas that may result
    input = input.replace(/,\s*,/g, ',');
    return input;
  }
  return input;
}

/**
 * Step 7: Removes trailing commas before the closing bracket.
 * @param input The color value string.
 * @returns The string with trailing commas removed.
 */
function removeTrailingCommas(input: string): string {
  return input.replace(/,(\s*)\]/g, ']');
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
function couldBeColorValueArray(colorValue: string): boolean {
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
function parseAndValidateColorValueToColorValueArray(colorValue: string): string[] {
  const colorValueArrayJson = parseColorValueToColorValueArray(colorValue);
  return validateColorValueArray(colorValueArrayJson);
}

/**
 * Parses `colorValue` to json.
 *
 * @param colorValue the color value to parse into a color value array.
 * @returns the color value array parsed to json
 */
function parseColorValueToColorValueArray(colorValue: string): any {
  try {
    return JSON.parse(colorValue);
  } catch {
    throw new ColorValueArraySyntaxException("'JSON.parse' failed.");
  }
}

/**
 * Validates that a color value array that just got parsed from a json string has the correct format.
 *
 * The following validations happen:
 *
 * 1. It is an array
 * 2. It has exactly eleven entries
 * 3. It only contains strings
 * 4. All of the strings are trimmed
 * 5. None of the strings are empty
 *
 * A color value array must have exactly eleven strings.
 *
 * @param parsedJson the just parsed json string to validate
 * @returns a valid color value array.
 * @throws {ColorValueArraySyntaxException} if a validation fails
 */
function validateColorValueArray(parsedJson: any): string[] {
  validateIsArray(parsedJson);
  // validateArrayLength(parsedJson);
  validateAllStrings(parsedJson);
  validateAllTrimmed(parsedJson);
  validateNoEmptyStrings(parsedJson);
  return parsedJson as string[];
}

/**
 * Checks if the value is an array.
 * @param value The value to check.
 * @throws {ColorValueArraySyntaxException} if not an array.
 */
function validateIsArray(value: any): void {
  if (!Array.isArray(value)) {
    throw new ColorValueArraySyntaxException('Value is not an array.');
  }
}

/**
 * Checks if the array has the expected length.
 *
 * The expected length is eleven.
 *
 * @param arr The array to check.
 * @throws {ColorValueArraySyntaxException} if length does not match.
 */
function validateArrayLength(arr: any[]): void {
  const EXPECTED_LENGTH = 11;

  if (arr.length !== EXPECTED_LENGTH) {
    throw new ColorValueArraySyntaxException(`Array must have exactly ${EXPECTED_LENGTH} entries.`);
  }
}

/**
 * Checks if all entries in the array are strings.
 * @param arr The array to check.
 * @throws {ColorValueArraySyntaxException} if any entry is not a string.
 */
function validateAllStrings(arr: any[]): void {
  arr.forEach((value, i) => {
    if (typeof value !== 'string') {
      throw new ColorValueArraySyntaxException(`Entry at index ${i} is not a string.`);
    }
  });
}

/**
 * Checks if all strings in the array are trimmed.
 * @param arr The array to check.
 * @throws {ColorValueArraySyntaxException} if any string is not trimmed.
 */
function validateAllTrimmed(arr: string[]): void {
  arr.forEach((value, i) => {
    if (value.trim() !== value) {
      throw new ColorValueArraySyntaxException(`Entry at index ${i} is not trimmed.`);
    }
  });
}

/**
 * Checks if any string in the array is empty.
 * @param arr The array to check.
 * @throws {ColorValueArraySyntaxException} if any string is empty.
 */
function validateNoEmptyStrings(arr: string[]): void {
  arr.forEach((value, i) => {
    if (value.trim() === '') {
      throw new ColorValueArraySyntaxException(`Entry at index ${i} is empty.`);
    }
  });
}

/**
 * Exception thrown when a color value array fails to parse or validate due to incorrect syntax.
 */

class ColorValueArraySyntaxException extends Error {
  constructor(reason: string | null = null) {
    let extendedReason = reason ? `: ${reason}` : '';
    super(`Failed to parse to color value array${extendedReason}`);
  }
}
