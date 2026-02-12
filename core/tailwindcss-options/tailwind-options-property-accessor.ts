/**
 * wraps the type T and provides a getter function with auto-completion and type-safety.
 *
 * ## Why is that class necessary?
 *
 * To maximize developer experience.
 *
 * For Tailwind plugins it is common practise to define the tailwind options object as an interface and wrap a class around that interface to provide type-safe access to the plugin options.
 * However, implementing an interface in TypeScript leads to code duplication as seen in the following real-world example:
 *
 * ```ts
 * // Defining the interface.
 * interface TailwindSemanticPluginOptionsType {
 *   optionA: Record<string, string[]>;
 *   optionB: Record<string, string[]>;
 * }
 *
 * // Defining the class.
 * class TailwindSemanticPluginOptions implements TailwindSemanticPluginOptionsType {
 *   // Writing getters for each property of the interface.
 *   get optionA() {
 *     return this.options.optionA;
 *   }
 *
 *   get optionB() {
 *     return this.options.optionB;
 *   }
 *
 *   constructor(private options: TailwindSemanticPluginOptionsType) {}
 * }
 *
 * // Accessing the properties.
 * const pluginOptions = new TailwindSemanticPluginOptions(options)
 * pluginOptions.optionA;
 * pluginOptions.optionB;
 * ```
 *
 * This class can be used to avoid writing getters for each property of the interface.
 * Instead, properties are accessed through a getter.
 *
 * ```ts
 * // Defining the interface.
 * interface TailwindSemanticPluginOptionsType {
 *   optionA: Record<string, string[]>;
 *   optionB: Record<string, string[]>;
 * }
 *
 * // Defining the class.
 * class TailwindSemanticPluginOptions extends TailwindTypesafeOptionsWrapper<TailwindSemanticPluginOptionsType> {
 *   // No need to define getters.
 *
 *   constructor(options: TailwindSemanticPluginOptionsType) {
 *     super(options);
 *   }
 * }
 *
 * // Accessing the properties.
 * const pluginOptions = new TailwindSemanticPluginOptions(options)
 * pluginOptions.get('optionA'); // Provides auto-complete and type-safety.
 * pluginOptions.get('optionB');
 * ```
 *
 * ## Example usage
 *
 * ### Minimal example
 *
 * You can enter any object into the class and it will automatically generate a get function that provides auto-complete and type-safety for the properties inputted in the class.
 *
 * ```ts
 * const optionsWrapper = new TailwindTypesafeOptionsWrapper({ colors: ["red", "green", "blue"], shades: [0, 50, 100] })
 *
 * const colors = optionsWrapper.get("colors") // type of string[]
 * const shades = optionsWrapper.get("shades") // type of number[]
 * ```
 *
 * ### Real world usage
 *
 * It is common to wrap tailwind options into a class. To provide type-safe access to these options the options-class can extend this wrapper-class.
 * For that the options-class must call the super wither the options object.
 *
 * ```ts
 * interface TailwindSemanticTypographyOptionsType {
 *   semanticTypography: Record<string, string[]>;
 * }
 *
 * class TailwindSemanticTypographyOptions extends TailwindTypesafeOptionsWrapper<TailwindSemanticTypographyOptionsType> {
 *   constructor(options: TailwindSemanticTypographyOptionsType) {
 *     super(options);
 *   }
 * }
 *
 * const tailwindSemanticTypographyOptions = new TailwindSemanticTypographyOptions({
 *     semanticTypography: {}
 * })
 *
 * tailwindSemanticTypographyOptions.get('semanticTypography'); // auto-completion and type-safety available.
 * ```
 */
export class TailwindOptionsPropertyAccessor<T> {
    get<K extends keyof T>(key: K): T[K] {
        return this.options[key]
    };

    getAll(): Readonly<T> {
        return this.options;
    }

    constructor(private readonly options: T) {}
}