import { build } from 'esbuild';
import type { BuildOptions } from 'esbuild';

const OUTPUT_DIR = 'dist/index.js';

const options: BuildOptions = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  outfile: OUTPUT_DIR,
  platform: 'node',
  format: 'esm',
  sourcemap: true,
  target: ['es2022'],
  external: [],
};

build(options)
  .then(() => {
    console.log(`Successfully build '${OUTPUT_DIR}'.`);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
