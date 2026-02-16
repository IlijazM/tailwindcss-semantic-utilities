import { CaseTransformer } from './case-transformer';

describe('CaseTransformer', () => {
  describe('PascalCase', () => {
    it('converts space separated words', () => {
      const t = new CaseTransformer('hello world');
      expect(t.toPascalCase()).toBe('HelloWorld');
    });

    it('handles mixed casing input', () => {
      const t = new CaseTransformer('helloWorldTest');
      expect(t.toPascalCase()).toBe('HelloWorldTest');
    });

    it('handles underscores and dashes', () => {
      const t = new CaseTransformer('hello_world-test');
      expect(t.toPascalCase()).toBe('HelloWorldTest');
    });
  });

  describe('camelCase', () => {
    it('converts space separated words', () => {
      const t = new CaseTransformer('hello world');
      expect(t.toCamelCase()).toBe('helloWorld');
    });

    it('handles PascalCase input', () => {
      const t = new CaseTransformer('HelloWorldTest');
      expect(t.toCamelCase()).toBe('helloWorldTest');
    });

    it('returns empty string for empty input', () => {
      const t = new CaseTransformer('');
      expect(t.toCamelCase()).toBe('');
    });
  });

  describe('snake_case', () => {
    it('converts space separated words', () => {
      const t = new CaseTransformer('hello world');
      expect(t.toSnakeCase()).toBe('hello_world');
    });

    it('handles camelCase input', () => {
      const t = new CaseTransformer('helloWorldTest');
      expect(t.toSnakeCase()).toBe('hello_world_test');
    });

    it('handles multiple separators', () => {
      const t = new CaseTransformer('hello---world___test');
      expect(t.toSnakeCase()).toBe('hello_world_test');
    });
  });

  describe('kebab-case', () => {
    it('converts space separated words', () => {
      const t = new CaseTransformer('hello world');
      expect(t.toKebabCase()).toBe('hello-world');
    });

    it('handles camelCase input', () => {
      const t = new CaseTransformer('helloWorldTest');
      expect(t.toKebabCase()).toBe('hello-world-test');
    });
  });

  describe('Sentence case', () => {
    it('capitalizes first word only', () => {
      const t = new CaseTransformer('hello world test');
      expect(t.toSentenceCase()).toBe('Hello world test');
    });

    it('handles single word', () => {
      const t = new CaseTransformer('hello');
      expect(t.toSentenceCase()).toBe('Hello');
    });

    it('returns empty string for empty input', () => {
      const t = new CaseTransformer('');
      expect(t.toSentenceCase()).toBe('');
    });
  });

  describe('Edge cases', () => {
    it('trims excessive whitespace', () => {
      const t = new CaseTransformer('   hello    world   ');
      expect(t.toSnakeCase()).toBe('hello_world');
    });

    it('handles numbers correctly', () => {
      const t = new CaseTransformer('helloWorld2Test');
      expect(t.toSnakeCase()).toBe('hello_world2_test');
      expect(t.toPascalCase()).toBe('HelloWorld2Test');
    });

    it('handles already normalized input', () => {
      const t = new CaseTransformer('already_normalized_input');
      expect(t.toSnakeCase()).toBe('already_normalized_input');
      expect(t.toKebabCase()).toBe('already-normalized-input');
    });
  });
});
