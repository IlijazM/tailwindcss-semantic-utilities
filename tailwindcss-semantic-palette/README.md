# TailwindCSS Semantic Palette

![Introduction](docs/images/readme_introduction.png)

TailwindCSS Semantic Palette is a highly extendable plugin for Tailwind CSS
that extends the default color palette with colors with semantic meaning.
This allows the user to reference colors by their intended meaning such as `primary`, `success`, or `warning`
instead of specific color values such as `indigo`, `green`, or `yellow`.

## Installation

```bash
npm install @ilijazm/tailwindcss-semantic-palette
```

```diff
@import "tailwindcss";
+ @plugin "@ilijazm/tailwindcss-semantic-palette";
```

## Features

### Default palette extension

By default, the plugin adds the following colors to the TailwindCSS palette:

* `brand`
* `primary`
* `secondary`
* `tertiary`
* `accent`
* `info`
* `success`
* `warning`
* `danger`
* `surface`
* `container`
* `content`

## Customization

### Select a subset of colors

To select only a subset of colors to add to the palette one can use the `semantic-colors` option.
For example

```css
@import 'tailwindcss';

/* Only extend the palette with the default colors for 'primary' and 'brand'. */
@plugin '@IlijazM/tailwindcss-semantic-palette' {
    semantic-palette: primary, brand;
}
```

### Customize a color

```css
@import 'tailwindcss';

/* Extends the palette with all the default colors but set a custom primary color */
@plugin '@IlijazM/tailwindcss-semantic-palette' {
    semantic-palette--primary: "var(--colors-cyan-*)";
}
```

```css
@import 'tailwindcss';

/* Extends the palette with all the default colors but set a custom brand color */
@plugin '@IlijazM/tailwindcss-semantic-palette' {
    semantic-palette--brand: "#ecfbf3", "#c6f2da", "#a0eac1", "#7be1a9", "#55d990", "#2fd077", "#26aa62", "#1e844c", "#155f36", "#0d3921", "#04130b";
}
```

### Select a subset of colors and customize colors

```css
@import 'tailwindcss';

/* Only extend the palette with 'primary', 'brand', and 'warning' and customize the colors 'primary' and 'brand'. */
@plugin '@IlijazM/tailwindcss-semantic-palette' {
    semantic-palette: primary, brand, warning;
    semantic-palette--brand: "#ecfbf3", "#c6f2da", "#a0eac1", "#7be1a9", "#55d990", "#2fd077", "#26aa62", "#1e844c", "#155f36", "#0d3921", "#04130b";
}
```

### Use custom colors exclusively

```css
@import 'tailwindcss';

/* Only extend the palette with the custom colors 'to-do', 'in-progress', and 'done' */
@plugin '@IlijazM/tailwindcss-semantic-palette' {
    semantic-palette: to-do, in-progress, done;
    semantic-palette--to-do: "#ecfbf3", "#c6f2da", "#a0eac1", "#7be1a9", "#55d990", "#2fd077", "#26aa62", "#1e844c", "#155f36", "#0d3921", "#04130b";
    semantic-palette--in-progress: "var(--color-sky-*)";
    semantic-palette--done: "hsl(260, 13%, 95%)", "hsl(262, 11%, 86%)", "hsl(260, 10%, 77%)", "hsl(260, 11%, 68%)", "hsl(261, 11%, 59%)", "hsl(261, 11%, 50%)", "hsl(261, 11%, 41%)", "hsl(263, 11%, 32%)", "hsl(263, 11%, 23%)", "hsl(263, 11%, 14%)", "hsl(260, 13%, 5%)"
}
```

### Add custom colors to a selected subset of colors

```css
@import 'tailwindcss';

/* Extend the palette with colors for 'success' and 'error'
   as well as the custom colors 'to-do', 'in-progress', and 'done' */
@plugin '@IlijazM/tailwindcss-semantic-palette' {
    semantic-palette: success, error, to-do, in-progress, done;
    semantic-palette--to-do: "#ecfbf3", "#c6f2da", "#a0eac1", "#7be1a9", "#55d990", "#2fd077", "#26aa62", "#1e844c", "#155f36", "#0d3921", "#04130b";
    semantic-palette--in-progress: "var(--color-sky-*)";
    semantic-palette--done: "hsl(260, 13%, 95%)", "hsl(262, 11%, 86%)", "hsl(260, 10%, 77%)", "hsl(260, 11%, 68%)", "hsl(261, 11%, 59%)", "hsl(261, 11%, 50%)", "hsl(261, 11%, 41%)", "hsl(263, 11%, 32%)", "hsl(263, 11%, 23%)", "hsl(263, 11%, 14%)", "hsl(260, 13%, 5%)"
}
```

### Add custom colors to all default colors

```css
@import 'tailwindcss';

/* Extends the palette with all the default colors
   as well as the custom colors 'to-do', 'in-progress', and 'done' */
@plugin '@IlijazM/tailwindcss-semantic-palette' {
    semantic-palette: "*", to-do, in-progress, done;
    semantic-palette--to-do: "#ecfbf3", "#c6f2da", "#a0eac1", "#7be1a9", "#55d990", "#2fd077", "#26aa62", "#1e844c", "#155f36", "#0d3921", "#04130b";
    semantic-palette--in-progress: "var(--color-sky-*)";
    semantic-palette--done: "hsl(260, 13%, 95%)", "hsl(262, 11%, 86%)", "hsl(260, 10%, 77%)", "hsl(260, 11%, 68%)", "hsl(261, 11%, 59%)", "hsl(261, 11%, 50%)", "hsl(261, 11%, 41%)", "hsl(263, 11%, 32%)", "hsl(263, 11%, 23%)", "hsl(263, 11%, 14%)", "hsl(260, 13%, 5%)"
}
```


### Build project

1. Install dependencies with `npm install`
1. Run `npm run build`
1. Result is in the `dist/` directory

### Run example

1. Go into the directory `example/`
1. Install dependencies with npm `install`
1. Run development build with `npm run dev`
1. Check the example via `http://localhost:5173/`

## Contributions

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](../LICENSE)
