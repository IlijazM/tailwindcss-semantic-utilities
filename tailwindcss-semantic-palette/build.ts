import { build, context } from 'esbuild';
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

async function watch() {
  const ctx = await context({
    ...options,
    plugins: [
      {
        name: 'log-on-rebuild',
        setup(build) {
          build.onEnd((result) => {
            if (result.errors.length === 0) {
              console.log(`[${new Date().toLocaleTimeString()}] Rebuild succeeded.`);
            } else {
              console.error(`[${new Date().toLocaleTimeString()}] Rebuild failed.`);
            }
          });
        },
      },
    ],
  });

  await ctx.watch();
  console.log(`Watching and building to '${OUTPUT_DIR}'...`);
}

// Parse CLI arguments for --watch
const isWatch = process.argv.includes('--watch');

if (isWatch) {
  watch().catch((error) => {
    console.error(error);
    process.exit(1);
  });
} else {
  build(options)
    .then(() => {
      console.log(`Successfully build '${OUTPUT_DIR}'.`);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
