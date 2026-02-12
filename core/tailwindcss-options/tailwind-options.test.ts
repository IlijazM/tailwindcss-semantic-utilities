import {TailwindOptions} from "./tailwind-options";

describe("TailwindcssOptions", () => {
    it("empty options and empty default options", () => {
        const options = {};
        const defaultOptions = {};

        const tailwindOptions  = new TailwindOptions({
            options,
            defaultOptions,
        }).getAll();

        expect(tailwindOptions).toStrictEqual(defaultOptions);
    });

    it("empty options", () => {
        const options = {};
        const defaultOptions = { foo: ['bar'] };

        const tailwindOptions  = new TailwindOptions({
            options,
            defaultOptions,
        }).getAll();

        expect(tailwindOptions).toStrictEqual(defaultOptions);
    });

    it("empty options", () => {
        const options = {};
        const defaultOptions = { foo: 'bar' };

        const tailwindOptions  = new TailwindOptions({
            options,
            defaultOptions,
        }).getAll();

        expect(tailwindOptions).toStrictEqual(defaultOptions);
    });

    it("selects single from object", () => {
        const tailwindOptions  = new TailwindOptions({
            options: {color: ["red"]},
            defaultOptions: {color: {red: '#ff0000', green: '#00ff00', blue: '#0000ff'}},
        }).getAll();

        expect(tailwindOptions).toStrictEqual({color: {red: '#ff0000'}});
    });

    it("selects multiple from object", () => {
        const tailwindOptions  = new TailwindOptions({
            options: {color: ["red", "blue"]},
            defaultOptions: {color: {red: '#ff0000', green: '#00ff00', blue: '#0000ff'}},
        }).getAll();

        expect(tailwindOptions).toStrictEqual({color: {red: '#ff0000', blue: '#0000ff'}});
    });

    it("selects none from object", () => {
        const tailwindOptions  = new TailwindOptions({
            options: {color: []},
            defaultOptions: {color: {red: '#ff0000', green: '#00ff00', blue: '#0000ff'}},
        }).getAll();

        expect(tailwindOptions).toStrictEqual({color: {red: '#ff0000', green: '#00ff00', blue: '#0000ff'}});
    });

    it("selects non-existing from object", () => {
        const tailwindOptions  = new TailwindOptions({
            options: {color: ["yellow"]},
            defaultOptions: {color: {red: '#ff0000', green: '#00ff00', blue: '#0000ff'}},
        }).getAll();

        expect(tailwindOptions).toStrictEqual({color: {}});
    });

  it('adds one default', () => {
    const tailwindOptions = new TailwindOptions({
      options: { 'color--yellow': '#ffff00' },
      defaultOptions: { color: { red: '#ff0000', green: '#00ff00', blue: '#0000ff' } },
    }).getAll();

    expect(tailwindOptions).toStrictEqual({ color: { yellow: '#ffff00' } });
  });

  it('adds multiple default', () => {
    const tailwindOptions = new TailwindOptions({
      options: { 'color--yellow': '#ffff00', 'color--cyan': '#00ffff' },
      defaultOptions: { color: { red: '#ff0000', green: '#00ff00', blue: '#0000ff' } },
    }).getAll();

    expect(tailwindOptions).toStrictEqual({ color: { yellow: '#ffff00', cyan: '#00ffff' } });
  });

  it('adds multiple and selects from default', () => {
    const tailwindOptions = new TailwindOptions({
      options: { color: ['red', 'green'], 'color--yellow': '#ffff00', 'color--cyan': '#00ffff' },
      defaultOptions: { color: { red: '#ff0000', green: '#00ff00', blue: '#0000ff' } },
    }).getAll();

    expect(tailwindOptions).toStrictEqual({
      color: { red: '#ff0000', green: '#00ff00', yellow: '#ffff00', cyan: '#00ffff' },
    });
  });

  it('adds multiple and selects wildcard default', () => {
    const tailwindOptions = new TailwindOptions({
      options: { color: ['*'], 'color--yellow': '#ffff00', 'color--cyan': '#00ffff' },
      defaultOptions: { color: { red: '#ff0000', green: '#00ff00', blue: '#0000ff' } },
    }).getAll();

    expect(tailwindOptions).toStrictEqual({
      color: { red: '#ff0000', green: '#00ff00', blue: '#0000ff', yellow: '#ffff00', cyan: '#00ffff' },
    });
  });
})