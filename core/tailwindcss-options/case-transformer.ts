/**
 * CaseTransformer
 *
 * Utility class to normalize an input string and transform it into
 * various common casing formats.
 *
 * Supported formats:
 * - PascalCase
 * - camelCase
 * - snake_case
 * - kebab-case
 * - Sentence case
 *
 * The input can contain spaces, underscores, dashes, or mixed casing.
 */
export class CaseTransformer {
  private readonly words: string[];

  constructor(input: string) {
    this.words = CaseTransformer.normalize(input);
  }

  /**
   * Convert input to PascalCase
   *
   * Example:
   * "hello world" → "HelloWorld"
   */
  toPascalCase(): string {
    return this.words.map((word) => CaseTransformer.capitalize(word)).join('');
  }

  /**
   * Convert input to camelCase
   *
   * Example:
   * "hello world" → "helloWorld"
   */
  toCamelCase(): string {
    if (this.words.length === 0) return '';

    const [first, ...rest] = this.words;
    return first.toLowerCase() + rest.map((word) => CaseTransformer.capitalize(word)).join('');
  }

  /**
   * Convert input to snake_case
   *
   * Example:
   * "hello world" → "hello_world"
   */
  toSnakeCase(): string {
    return this.words.join('_');
  }

  /**
   * Convert input to kebab-case
   *
   * Example:
   * "hello world" → "hello-world"
   */
  toKebabCase(): string {
    return this.words.join('-');
  }

  /**
   * Convert input to Sentence case
   *
   * Example:
   * "hello world" → "Hello world"
   */
  toSentenceCase(): string {
    if (this.words.length === 0) return '';

    const [first, ...rest] = this.words;
    return CaseTransformer.capitalize(first) + (rest.length ? ' ' + rest.join(' ') : '');
  }

  /**
   * Normalize input into lowercase word tokens.
   *
   * Handles:
   * - spaces
   * - dashes
   * - underscores
   * - camelCase / PascalCase boundaries
   */
  private static normalize(input: string): string[] {
    return input
      .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
      .replace(/[_\-]+/g, ' ')
      .trim()
      .split(/\s+/)
      .map((word) => word.toLowerCase());
  }

  /**
   * Capitalize the first letter of a word.
   */
  private static capitalize(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
