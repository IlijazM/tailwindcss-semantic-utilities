# Tailwind CSS Blob Plugin

Tailwind CSS Blob Plugin is a plugin for Tailwind CSS that adds some blob-shaped masks.

## Features

Use the utility `mask-blob` to mask a div.

### Basic Example

To mask a diff use `mask-blob`:

<!-- prettier-ignore -->
```html
<div class="mask-blob w-64 h-64 bg-gradient-to-br from-indigo-500 to-pink-500"></div>
```

This yields the following result:

![Example Blob](docs/example_blob.png)

### All Blobs

These are all blobs included in this plugin:

![All blobs](docs/all_blobs.png)

### Classes

| Classname      | Type   |                        |
| -------------- | ------ | ---------------------- |
| `.mask-blob`   | `mask` | Same as `.mask-blob-1` |
| `.mask-blob-1` | `mask` |                        |
| `.mask-blob-2` | `mask` |                        |
| `.mask-blob-3` | `mask` |                        |
| `.mask-blob-4` | `mask` |                        |
| `.mask-blob-5` | `mask` |                        |
| `.mask-blob-6` | `mask` |                        |
| `.mask-blob-7` | `mask` |                        |
| `.mask-blob-8` | `mask` |                        |

## Installation

```
npm install @ilijazm/tailwindcss-blob`
```

```diff
@import "tailwindcss";
+ @import "@ilijazm/tailwindcss-blob";
```

## Development

1. Clone the repository.
1. Go into the directory `tailwindcss-blob/`.

```
.
└── 📁 tailwindcss-blob/
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
