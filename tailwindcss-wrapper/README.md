# Tailwind CSS Wrapper

Tailwind CSS Wrapper is a plugin for Tailwind CSS v4 that adds commonly used utilities for limiting the contents width and centering it.

Simply use `wrapper-md` to bring the content to a width that is readable for the eyes and centers it like in this example:

```html
<div class="wrapper-md">
  <div class="bg-slate-200">Lorem ipsum...</div>
</div>
```

This yields the following result:

![Example wrapper-md lorem](docs/example_wrapper-md_lorem.png)

Further features and examples of this plugin are demonstrated in the [Features](#features) section.

This plugin depends on `@ilijazm/tailwindcss-semantic-spacings`.
More about that in the [Dependencies](#dependencies) section.

## Reason

### ⚠️ Problem Statement

It is very common to limit the contents widths when designing user interfaces.
This is mainly because text gets easier to read when the content is set to a fixed width.
Also making the text scale with the width of the website is bad practise.

### 📦 Conventional Method

To address this issue one can set the width of the container like the following: `max-w-[24rem]`.
Further, one can center the div by setting the inline margin to `auto` like that: `mx-auto`.
Additionally, do always have some padding on the left and right even if the screen's width is smaller than the wrappers width,
one must set an inline padding like that: `px-4`
The following example demonstrates the proposed approach:

```html
<div class="w-[24rem] mx-auto px-4"></div>
```

### 🔧 Maintainability Issues

Setting the width to a primitive value like `24rem` leads to inconsistencies, is hard to maintain, and not verbose at all.

**Inconsistent**:
If used inconsistently the user interface might not align vertically which leads do off-looking designs.
Also when different units like `rem`, `em`, and `px` are mixed together the scaling could get inconsistent as well.

**Maintaintable**:
If one wishes to change all widths of contents at the same time,
it is easier if one must only change one variable instead of carefully checking all present values in the code.

**Not verbose**:
Using semantic names like `sm`, `md`, `lg` instead of primitives like `24rem`, `32rem`, `64rem` disconnects the developer from using actual values for widths and let's the developer think about the meaning or intent behind the size.

### 🚀 Proposed Solution

This plugin proposes the following solution the the previously state problem statement:
Setting the width and centering the diff is a common practice that deserves its own utility class.
This utility class sets the width of a container based on a **semantic naming schema** like `sm`, `md`, `lg` instead of a schema relying on primitive values like `24rem`, `32rem`, `64rem`.
Furthermore, it sets a default inline padding and centers the container.

**❌ Without tailwindcss-wrapper plugin:**

```html
<div class="w-[24rem] mx-auto px-4"></div>
```

**✅ With tailwindcss-wrapper plugin:**

```html
<div class="wrapper-md"></div>
```

### 🔄 Alternative Approach

### 🚀 Alternative Proposed Solution

## Features

### Basic example

### Classes

| Classname   | Type      |     |
| ----------- | --------- | --- |
| `wrapper-*` | `utility` |     |
| `wrapped-*` | `utility` |     |

### Variables

## Installation

```
npm install @ilijazm/tailwindcss-wrapper
```

```diff
@import "tailwindcss";
+ @import "@ilijazm/tailwindcss-wrapper";
```

## Development

1. Clone the repository.
1. Go into the directory `tailwindcss-wrapper/`.

```
.
└── 📁 tailwindcss-wrapper/
    ├── 📁 example/
    └── 📁 src/
```

### Run example

1. Go into the directory `example/`.
1. Install dependencies with npm `install`
1. Run development build with `npm run dev`
1. Check the example via `http://localhost:5173/`

## Contributions

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](../LICENSE)
