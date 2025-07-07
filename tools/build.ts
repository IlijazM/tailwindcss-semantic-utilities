#!/usr/bin/env node

import handlebars from 'handlebars';
import fs from 'fs-extra';
import path from 'path';
import { program } from 'commander';
import { sync as glob } from 'glob';

program
  .name('builder')
  .description('builds src/ folders')
  .version('0.1.0')
  .option('--watch, -w', 'Reacting to file changes live')
  .option('--src, -s <path>', 'Path to source directory');

program.parse(process.argv);

const options = program.opts();

let sourcePath = options.src || '.';
sourcePath = sourcePath.replace(/\/src\/?$/, '');

const helpers = glob(`${sourcePath}/src/**/*.helper.{js,ts}`);
for (const helper of helpers) {
  const helperName = path.basename(helper.split('.')[0]);
  const helperFunction = await import(path.resolve(helper));
  handlebars.registerHelper(helperName, helperFunction.default);
  console.log(`Registered helper '${helperName}'.`);
}

const files = glob(`${sourcePath}/src/**/*.hbs`).filter((filePath) => !filePath.includes('[') && !filePath.includes(']'));

for (const file of files) {
  parseFile(file);
}

function parseFile(srcFilePath: string): void {
  const srcFileContent = fs.readFileSync(srcFilePath, 'utf-8');

  const distFilePath = srcFilePath.replace('src/', 'dist/').replace(/.hbs$/, '');
  const distFileContent = handlebars.compile(srcFileContent)({});

  fs.mkdirSync(path.dirname(distFilePath), { recursive: true });
  fs.writeFileSync(distFilePath, distFileContent);
  console.log(`File written ${distFilePath}.`);
}
