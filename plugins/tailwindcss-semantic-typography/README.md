# TailwindCSS Semantic Typography

TailwindCSS Semantic Typography is a highly extendable plugin for Tailwind CSS
that add semantic text utilities for many use cases like headings, labels, code-blocks, etc.
This allows the user to define a type system and re-use these font styles later.

For example `heading` translates to the following:

```css
.text-heading {
    @apply text-3xl leading-12 tracking-tight font-medium color-[var(--color-content-emphasis, var(--color-black))];
}
```

![Introduction](docs/images/readme_introduction.png)

**Table of content**

1. [Installation](#1-installation)
2. [Features](#2-features)
3. [Customization](#3-customization)
4. [Contributions](#4-contributions)
5. [Further information](#5-further-information)

## 1. Installation

To install the TailwindCSS Semantic Typography follow the following steps:

1. Install the TailwindCSS Semantic Typography dependency:

```bash
npm install @ilijazm/tailwindcss-semantic-typography
```

2. Import the plugin in your `.css`-file.

```diff
@import "tailwindcss";
+ @plugin "@ilijazm/tailwindcss-semantic-typography";
```

## 2. Features

### Default utilities

By default, the plugin adds the following utility classes:

| utility      | translates                                                                                                              |
|--------------|-------------------------------------------------------------------------------------------------------------------------|
| `display-1`  | `text-7xl leading-32 tracking-tighter font-normal color-[var(--color-content-emphasis var(--color-black))]`             |
| `display-2`  | `text-5xl leading-20 tracking-tighter font-normal color-[var(--color-content-emphasis var(--color-black))]`             |
| `heading`    | `text-3xl leading-12 tracking-tight font-medium color-[var(--color-content-emphasis var(--color-black))]`               |
| `subheading` | `text-lg leading-8 tracking-normal font-bold color-[var(--color-content-emphasis var(--color-black))]`                  |
| `lead`       | `text-xl leading-7 tracking-normal font-normal color-[var(--color-content-text-emphasis var(--color-black))]`           |
| `body`       | `text-base leading-6 tracking-normal font-normal color-[var(--color-content-text var(--color-neutral-700))]`            |
| `quote`      | `text-xl leading-7 tracking-normal font-medium color-[var(--color-content-text-muted var(--color-neutral-500))] italic` |
| `overline`   | `text-xs leading-5 tracking-widest font-bold color-[var(--color-content-emphasis var(--color-black))] uppercase`        |
| `code`       | `text-base leading-5 tracking-normal font-normal color-[var(--color-content-emphasis var(--color-black))] font-mono`    |
| `heading-1`  | `text-7xl leading-[8rem] tracking-tighter font-normal color-[var(--color-content-emphasis var(--color-black))]`         |
| `heading-2`  | `text-5xl leading-20 tracking-tighter font-normal color-[var(--color-content-emphasis var(--color-black))]`             |
| `heading-3`  | `text-4xl leading-15 tracking-tight font-semibold color-[var(--color-content-emphasis var(--color-black))]`             |
| `heading-4`  | `text-3xl leading-10 tracking-tight font-bold color-[var(--color-content-emphasis var(--color-black))]`                 |
| `heading-5`  | `text-lg leading-7 tracking-normal font-bold color-[var(--color-content-emphasis var(--color-black))]`                  |
| `heading-6`  | `text-base leading-6 tracking-normal font-black color-[var(--color-content-emphasis var(--color-black))]`               |

## 3. Customization

The **TailwindCSS Semantic Utilities Plugin** is highly extendable.
You can add, remove and change the default settings.

### Select which text-styles to include

To select which text styles you want to include simply write them as a list with the `typography` option.

The following code demonstrates how the **TailwindCSS Semantic Utilities Plugin** can be used
with just the "heading", "subheading", and "body" text-styles:

```css
/** Select only the "heading", "subheading", and "body" text-styles */
@plugin "@ilijazm/tailwindcss-semantic-typography" {
    "typography": "heading", "subheading", "body";
}
```

> [!NOTE]
> 
> You can also use a wildcard (`*`) to select all text-styles
> although all text styles are selected by default if you don't set any additional options.

### Customize existing text-style

To customize an existing text-style you can use the `typography--<text-style>` option.
The value of the option is defined in a _Tailwind CSS like_ classes.

The following code demonstrates how the **TailwindCSS Semantic Utilities Plugin** can be used
with a custom "heading" style:

```css
/** Custom "heading" text style. */
@plugin "@ilijazm/tailwindcss-semantic-typography" {
    "typography--heading": "text-4xl", "leading-14", "tracking-tight", "font-extrabold", "color-black";
}
```

This uses a syntax which is similar to that of Tailwind CSS but a bit more restricted.
The following table shows all possible values:

| Style Type     | Usage                                                 | CSS-Equivalent                                | Constraints and allowed values                                                                                                                                     |
|----------------|-------------------------------------------------------|-----------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Color          | `color-<value>`                                       | `color: var(--color-<value>)`                 | `--color-*` variables like: `red-500`, `neutral-800`, `black`, etc. as well as arbitrary values like `[var(--color-emphasis, var(--color-black))]`.                |
| Font family    | `font-<value>`                                        | `font-family: var(--font-<value>)`            |                                                                                                                                                                    |
| Font size      | `text-<value>`                                        | `font-size: var(--text-<value>)`              | `--text-*` variables like: `xs`, `sm`, `base`, `lg`, `xl`, `...`, as well as arbitrary values like: `[2.5rem]`.                                                    |
| Font style     | `italic`, `not-italic`                                | `@apply <value>` or `font-style: <value>`     | Like described. Info: `not-italic` is not a css value but rather a Tailwind CSS utility class.                                                                     |
| Font weight    | `font-<value>`                                        | `font-weight: <respected value>`              | Only these values: `thin`, `extralight`, `light`, `normal`, `medium`, `semibold`, `bold`, `extrabold`, `black`. This is because of collision with the font family. |
| Letter spacing | `tracking-<value>`                                    | `letter-spacing: var(--tracking-<value>`      | `--tracking-*` variables like: `widest`, `wide`, `normal`, `tight`, `tightest`, or any additional defined varaibles, as well as arbitrary values like `[0.5rem]`.  |
| Line height    | `leading-<value>`                                     | `line-height: calc(var(--spacing) * <value>)` | Numbers like: `1`, `2`, `...`, or arbitrary values like: `[1rem]`.                                                                                                 |
| Text transform | `uppercase`, `lowercase`, `capitalize`, `normal-case` | `@apply <value>` or `text-transform: <value>` | Like described. Info: `normal-case` is not a css value but rather a Tailwind CSS utility class.                                                                    |

> [!NOTE]
> 
> You can use a wildcard (`*`) to apply the default styles
> and to override the these.

> [!NOTE]
> 
> The order in which style rules are applies is respected
> meaning that the next style rule will override the previous one.
> 
> E.g. `"uppercase", "lowercase", "normal-case"` will result in `"normal-case"`:
> 
> ```css
> @plugin "@ilijazm/tailwindcss-semantic-typography" {
>     "typography-body": "uppercase", "lowercase", "normal-case"; /** -> "normal-case" */
> }
> ```

> [!INFO]
>
> Changed text styles do not need to be registered in the `typography` option as they are included automatically.

### Add new text style

In order to add a next text style it simply must get defined similarly to how to customize an existing style
by simply using the respected option `typography-<custom text style name>`.
The value of the option is defined in a _Tailwind CSS like_ classes.

The following code demonstrates how the **TailwindCSS Semantic Utilities Plugin** can be used
with a custom "cta-button" style:

```css
/** Custom "cta-button" text style. */
@plugin "@ilijazm/tailwindcss-semantic-typography" {
    "typography--cta-button": "text-xl", "leading-5", "font-semibold", "color-black", "uppercase";
}
```

> [!INFO]
> 
> Custom text styles do not need to be registered in the `typography` option as they are included automatically.

## 4. Contributions

Contributions are welcome! Please feel free to submit a Pull Request.

### Build project

1. Install dependencies with `npm install`
1. Run `npm run build`
1. Result is in the `dist/` directory

### Run example

1. Go into the directory `example/`
1. Install dependencies with npm `install`
1. Run development build with `npm run dev`
1. Check the example via `http://localhost:5173/`

## 5. Further information

### Dependencies

```
.
└── 📦 tailwindcss
```

### License

[MIT](../LICENSE)
