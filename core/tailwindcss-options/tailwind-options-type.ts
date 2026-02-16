import { TailwindOption } from './tailwind-option';

/**
 * The type of tailwind options which is a record of tailwind options.
 */
export type TailwindOptionsType<T> = {
  [K in keyof T]: TailwindOption<T[K]>;
};