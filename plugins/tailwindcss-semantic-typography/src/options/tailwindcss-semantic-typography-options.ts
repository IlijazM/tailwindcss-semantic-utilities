/**
 * @packageDocumentation
 *
 * This package is responsible for parsing the options object provided from TailwindCSS into a typed class that is
 * getting used for generating the palette.
 *
 * This package does the following things:
 *
 * ## No options provided
 *
 * If the user didn't provide any options, a default should be chosen containing a handful of useful color additions for
 * the palette. The user can simply go with the default palette by importing the plugin with no options provided like
 * the following:
 *
 * ```css
 * @import 'tailwindcss';
 * @plugin '@IlijazM/tailwindcss-semantic-typography';
 * ```
 *
 * This yields the default output which is defined in the const {@link DEFAULT_TYPOGRAPHY_OPTIONS} and looks like the
 * following:
 *
 * ```json
 * {
 *   "semanticTypography": {
 *     "brand": ["var(--color-blue-50)", "var(--color-blue-100)", ..., "var(--color-blue-950)"],
 *     "primary": ["var(--color-indigo-50)", "var(--color-indigo-100)", ..., "var(--color-indigo-950)"],
 *     ...
 *     "content": ["var(--color-neutral-50)", "var(--color-neutral-100)", ..., "var(--color-neutral-950)"],
 *   }
 * }
 * ```
 *
 * ## A sub-set of colors
 *
 * A user may select a sub-set of colors that get used. This is useful if said user only needs for example "primary" and
 * "brand". The user can select these two colors by prompting the sub-set of colors using the option "semantic-typography"
 * which looks like the following:
 *
 * ```css
 * @import 'tailwindcss';
 * @plugin '@IlijazM/tailwindcss-semantic-typography' {
 *   semantic-typography: primary, brand;
 * }
 * ```
 *
 * This yields a subset of the default output defined in the const {@link DEFAULT_TYPOGRAPHY_OPTIONS} and looks like the
 * following:
 *
 * ```json
 * {
 *   "semanticTypography": {
 *     "brand": ["var(--color-blue-50)", "var(--color-blue-100)", ..., "var(--color-blue-950)"],
 *     "primary": ["var(--color-indigo-50)", "var(--color-indigo-100)", ..., "var(--color-indigo-950)"],
 *   }
 * }
 * ```
 *
 * ## Custom colors
 *
 * A user may define his custom colors. This is useful if there is a specific use case where a color should get assigned
 * a semantic meaning for example the user defined an ui that includes a kanban board. That kanban board should use a
 * semantic color for each column which includes "To Do", "In Progress", "Done". It needs these colors in different
 * shades because the background color, border color, text color, and button color changes based on the column. In this
 * case the user can define new colors by using the options "semantic-typography" and the options
 * "semantic-typography--<color_name>" which looks the following:
 *
 * ```css
 * @import 'tailwindcss';
 * @plugin '@IlijazM/tailwindcss-semantic-typography' {
 *   semantic-typography: "*", to-do, in-progress, done;
 *   semantic-typography--to-do: "#ecfbf3", "#c6f2da", "#a0eac1", "#7be1a9", "#55d990", "#2fd077", "#26aa62", "#1e844c", "#155f36", "#0d3921", "#04130b";
 *   semantic-typography--in-progress: "var(--color-sky-50)", "var(--color-sky-100)", "var(--color-sky-200)", "var(--color-sky-300)", "var(--color-sky-400)", "var(--color-sky-500)", "var(--color-sky-600)", "var(--color-sky-700)", "var(--color-sky-800)", "var(--color-sky-900)", "var(--color-sky-950)";
 *   semantic-typography--done: "hsl(260, 13%, 95%)", "hsl(262, 11%, 86%)", "hsl(260, 10%, 77%)", "hsl(260, 11%, 68%)", "hsl(261, 11%, 59%)", "hsl(261, 11%, 50%)", "hsl(261, 11%, 41%)", "hsl(263, 11%, 32%)", "hsl(263, 11%, 23%)", "hsl(263, 11%, 14%)", "hsl(260, 13%, 5%)"
 * }
 * ```
 *
 * ## Customize colors
 *
 * A user may select, add, and customize colors
 *
 */
import {
    INVALID_CUSTOM_SEMANTIC_COLOR_TYPE,
    INVALID_SEMANTIC_PALETTE_TYPE,
    INVALID_TAILWINDCSS_OPTIONS_TYPE
} from "@src/options/tailwindcss-semantic-typography-options-errors.ts";
import {attemptParseValueArray} from "@src/options/attempt-parse-value-array.ts";


type TypographyOptionsType = Record<string, string[]>;

export interface TailwindcssSemanticTypographyOptionsType {
    semanticTypography: TypographyOptionsType;
}

export const DEFAULT_FONT_STYLE = [];

export const DEFAULT_TYPOGRAPHY_OPTIONS: Record<string, string[]> = {
    'display-1': ['text-7xl', 'leading-28', 'tracking-tighter', 'font-normal', 'color-[var(--color-content-emphasis, var(--color-black))]'],
    'display-2': ['text-5xl', 'leading-20', 'tracking-tighter', 'font-normal', 'color-[var(--color-content-emphasis, var(--color-black))]'],
    'heading': ['text-3xl', 'leading-12', 'tracking-tight', 'font-bold', 'color-[var(--color-content-emphasis, var(--color-black))]'],
    'heading-highlight': ['text-3xl', 'leading-12', 'tracking-tight', 'font-extrabold', 'color-[var(--color-content-emphasis, var(--color-black))]', 'italic'],
    'subheading': ['text-lg', 'leading-8', 'tracking-normal', 'font-bold', 'color-[var(--color-content-emphasis, var(--color-black))]'],
    'lead': ['text-xl', 'leading-9', 'tracking-normal', 'font-normal', 'color-[var(--color-content-text-emphasis, var(--color-black))]'],
    'body': ['text-base', 'leading-7', 'tracking-normal', 'font-normal', 'color-[var(--color-content-text, var(--color-neutral-700))]'],
    'quote': ['text-xl', 'leading-7', 'tracking-normal', 'font-medium', 'color-[var(--color-content-text-muted, var(--color-neutral-500))]', 'italic'],
    'overline': ['text-xs', 'leading-5', 'tracking-widest', 'font-bold', 'color-[var(--color-content-emphasis, var(--color-black))]', 'uppercase'],
    'button': ['text-sm', 'leading-5', 'tracking-wide', 'font-semibold', 'color-[var(--color-content-emphasis, var(--color-black))]', "uppercase"],
    'code': ['text-base', 'leading-5', 'tracking-normal', 'font-normal', 'color-[var(--color-content-emphasis, var(--color-black))]', 'font-mono'],
    'heading-1': ['text-7xl', 'leading-[8rem]', 'tracking-tighter', 'font-normal', 'color-[var(--color-content-emphasis, var(--color-black))]'],
    'heading-2': ['text-5xl', 'leading-20', 'tracking-tighter', 'font-normal', 'color-[var(--color-content-emphasis, var(--color-black))]'],
    'heading-3': ['text-4xl', 'leading-15', 'tracking-tight', 'font-semibold', 'color-[var(--color-content-emphasis, var(--color-black))]'],
    'heading-4': ['text-3xl', 'leading-10', 'tracking-tight', 'font-bold', 'color-[var(--color-content-emphasis, var(--color-black))]'],
    'heading-5': ['text-lg', 'leading-7', 'tracking-normal', 'font-bold', 'color-[var(--color-content-emphasis, var(--color-black))]'],
    'heading-6': ['text-base', 'leading-6', 'tracking-normal', 'font-black', 'color-[var(--color-content-emphasis, var(--color-black))]'],
};

export class TailwindcssSemanticTypographyOptions implements TailwindcssSemanticTypographyOptionsType {
    readonly semanticTypography: TypographyOptionsType;

    constructor(options: unknown) {
        this.semanticTypography = this.applyOptions(options);
    }

    private applyOptions(options: unknown): TypographyOptionsType {
        if (options == null) {
            return DEFAULT_TYPOGRAPHY_OPTIONS;
        }

        if (typeof options !== 'object') {
            throw INVALID_TAILWINDCSS_OPTIONS_TYPE;
        }

        return this.applyAllSemanticTypographyOptions(options);
    }

    private applyAllSemanticTypographyOptions(options: any): TypographyOptionsType {
        let semanticTypography: TypographyOptionsType = {};

        semanticTypography = this.applySemanticTypographyOption(options);
        semanticTypography = this.applySemanticTypographyCustomTextStyleOptions(semanticTypography, options);

        return semanticTypography;
    }

    private applySemanticTypographyOption(options: any): TypographyOptionsType {
        // If no semantic palette option is provided, return the default semantic palette.
        if (!('semantic-typography' in options)) {
            return DEFAULT_TYPOGRAPHY_OPTIONS;
        }

        const semanticTypographyOption = options['semantic-typography'];

        // This case happens when there is only on color provided in the .css file. In this case the string should just be
        // treated as an array with one element.
        //
        // For example:
        //
        // ```css
        // @import 'tailwindcss';
        // @plugin '@IlijazM/tailwindcss-semantic-typography' {
        //   semantic-typography: primary;
        // }
        // ```
        if (typeof semanticTypographyOption === 'string') {
            return this.mergeSemanticTypographyOptions([semanticTypographyOption]);
        }

        // This is a special case where the user provides a number instead of a string. This can happen when the user
        // provides a number color name without quotes in the .css file. I'm not sure why someone would do that, but just in
        // case. In this case the number should be treated as an array with the number as string as the only element.
        //
        // For example:
        //
        // ```css
        // @import 'tailwindcss';
        // @plugin '@IlijazM/tailwindcss-semantic-typography' {
        //   semantic-typography: 100;
        // }
        // ```
        if (typeof semanticTypographyOption === 'number') {
            return this.mergeSemanticTypographyOptions([semanticTypographyOption.toString()]);
        }

        // This case happens when there is a list of colors provided in the .css file.
        //
        // For example:
        //
        // ```css
        // @import 'tailwindcss';
        // @plugin '@IlijazM/tailwindcss-semantic-typography' {
        //   semantic-typography: primary, brand;
        // }
        // ```
        if (Array.isArray(semanticTypographyOption)) {
            return this.mergeSemanticTypographyOptions(semanticTypographyOption);
        }

        // If the semantic palette option is not a string, number, or array, throw an error. I'm not sure how this would
        // happen, but just in case.
        throw INVALID_SEMANTIC_PALETTE_TYPE;
    }

    private mergeSemanticTypographyOptions(semanticTypographyOption: string[]): TypographyOptionsType {
        const semanticTypography: TypographyOptionsType = {};

        for (const textStyle of semanticTypographyOption) {
            if (textStyle === '*') {
                Object.assign(semanticTypography, DEFAULT_TYPOGRAPHY_OPTIONS);
            } else if (textStyle in DEFAULT_TYPOGRAPHY_OPTIONS) {
                semanticTypography[textStyle] = DEFAULT_TYPOGRAPHY_OPTIONS[textStyle]!;
            } else {
                semanticTypography[textStyle] = DEFAULT_FONT_STYLE;
            }
        }

        return semanticTypography;
    }

    private applySemanticTypographyCustomTextStyleOptions(
        semanticTypography: TypographyOptionsType,
        options: any,
    ): TypographyOptionsType {
        const customTextStyleKeys: string[] = this.getAllCustomTextStyleNames(options);

        for (const customTextStyle of customTextStyleKeys) {
            if (!(customTextStyle in semanticTypography)) {
                // Potentially warn the user that they defined a custom color that is not in the semantic palette.
                continue;
            }

            semanticTypography[customTextStyle] = this.getCustomSemanticTypography(options, customTextStyle);

            if (semanticTypography[customTextStyle].includes("*")) {
                const overrideStyle = semanticTypography[customTextStyle].filter(e => e !== "*");
                semanticTypography[customTextStyle] = [...(DEFAULT_TYPOGRAPHY_OPTIONS[customTextStyle] ?? []), ...overrideStyle];
            }
        }

        return semanticTypography;
    }

    private getCustomSemanticTypography(options: any, textStyleName: string): string[] {
        const option = options['semantic-typography--' + textStyleName];

        if (typeof option === 'string') {
            return option.split(";").map((e: string) => e.trim())
        } else if (Array.isArray(option)) {
            return option;
        } else {
            throw INVALID_CUSTOM_SEMANTIC_COLOR_TYPE;
        }
    }

    private getAllCustomTextStyleNames(options: any): string[] {
        const customColorKeys: string[] = [];

        for (const [potentialCustomColorKey] of Object.entries(options)) {
            if (!potentialCustomColorKey.startsWith('semantic-typography--')) {
                continue;
            }

            const customColorKey = potentialCustomColorKey.replace(/^semantic-typography--/, '');
            customColorKeys.push(customColorKey);
        }

        return customColorKeys;
    }
}
