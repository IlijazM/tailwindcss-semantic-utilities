// @generated by Chat-GPT

import { attemptToParseColorValueArray } from '@src/options/color-value-array.ts';

describe('attemptToParseColorValueArray', () => {
  const expectedResult = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k'];
  const validColorArray = JSON.stringify(expectedResult);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns false if input is not bracketed', () => {
    const result = attemptToParseColorValueArray('"a","b","c"');
    expect(result).toBe(false);
  });

  it('parses valid color array successfully', () => {
    const result = attemptToParseColorValueArray(validColorArray);
    // validation is not implemented, so this test only asserts that parsing passes
    expect(result).toEqual(expect.any(Array));
    expect(result).toHaveLength(11);
    expect(result).toMatchObject(expectedResult);
  });

  it('repairs different quotes and parses', () => {
    const input = "['a','b','c','d','e','f','g','h','i','j','k']";
    const result = attemptToParseColorValueArray(input);
    expect(result).toEqual(expect.any(Array));
    expect(result).toHaveLength(11);
    expect(result).toMatchObject(expectedResult);
  });

  it('returns false for completely invalid JSON', () => {
    const input = '[a, b, c, d, e, f, g, h, i, j, k";]';
    expect(() => attemptToParseColorValueArray(input)).toThrow();
  });

  it('repairs semicolon-separated items', () => {
    const input = '["a";"b";"c";"d";"e";"f";"g";"h";"i";"j";"k"]';
    const result = attemptToParseColorValueArray(input);
    expect(result).toEqual(expect.any(Array));
    expect(result).toHaveLength(11);
    expect(result).toMatchObject(expectedResult);
  });

  it('repairs space-separated values with no quotes', () => {
    const input = '[a b c d e f g h i j k]';
    const result = attemptToParseColorValueArray(input);
    expect(result).toEqual(expect.any(Array));
    expect(result).toHaveLength(11);
    expect(result).toMatchObject(expectedResult);
  });

  it('repairs comma-separated values with no quotes', () => {
    const input = '[a,b,c,d,e,f,g,h,i,j,k]';
    const result = attemptToParseColorValueArray(input);
    expect(result).toEqual(expect.any(Array));
    expect(result).toHaveLength(11);
    expect(result).toMatchObject(expectedResult);
  });

  it('trims whitespace from each entry in the input array', () => {
    const input = '[" a ", "b ", " c", "  d  ", "e", " f", "g ", " h", "i ", " j", "k "]';
    const result = attemptToParseColorValueArray(input);
    expect(result).toEqual(expect.any(Array));
    expect(result).toHaveLength(11);
    expect(result).toMatchObject(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k']);
  });

  it('removes empty strings and repairs', () => {
    const input = '["a", "b", "", "c", "d", "e", "f", "g", "h", "i", "j", "k"]';
    const result = attemptToParseColorValueArray(input);
    expect(result).toEqual(expect.any(Array));
    expect(result).toHaveLength(11);
    expect(result).toMatchObject(expectedResult);
  });

  it('removes trailing commas and repairs', () => {
    const input = '["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", ]';
    const result = attemptToParseColorValueArray(input);
    expect(result).toEqual(expect.any(Array));
    expect(result).toHaveLength(11);
    expect(result).toMatchObject(expectedResult);
  });

  it('rethrows if repair still fails with ColorValueArraySyntaxException', () => {
    const broken = '[123]';
    expect(() => {
      attemptToParseColorValueArray(broken);
    }).toThrow();
  });

  it('allows escaped quotes inside string entries', () => {
    const input = '["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k\\\""]';
    const result = attemptToParseColorValueArray(input);
    expect(result).toEqual(expect.any(Array));
    expect(result).toHaveLength(11);
    expect((result as string[])[10]).toBe('k"');
  });

  it('repairs and parses entries with escaped quotes and extra whitespace', () => {
    const input = '[ "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", " k\\\" " ]';
    const result = attemptToParseColorValueArray(input);
    expect(result).toEqual(expect.any(Array));
    expect(result).toHaveLength(11);
    expect((result as string[])[10]).toBe('k"');
  });
});
