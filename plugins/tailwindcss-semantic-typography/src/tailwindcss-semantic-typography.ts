import {TextStyle} from '@src/text-stlye/text-style.ts';
import {TailwindcssSemanticTypographyOptions} from "@src/options/tailwindcss-semantic-typography-options.ts";

export class TailwindCssSemanticTypographyPlugin {
    public get utilities() {
        return {
            ...Object.fromEntries(
                Object.entries(this.options.semanticTypography).flatMap(([className, style]) => (Object.entries({
                    ...new TextStyle({className, style}).cssDeclarations,
                })))
            ),
        };
    }

    public get base() {
        console.log(Object.entries(this.options.semanticTypography));
        return {
            ":root": Object.fromEntries(
                Object.entries(this.options.semanticTypography).flatMap(([className, style]) => (Object.entries({
                    ...new TextStyle({className, style}).cssRoot,
                })))
            )
        };
    }

    public get themeExtension() {
        return {
            // textStyle: Object.fromEntries(
            //     Object.entries(this.options.semanticTypography).flatMap(([className, style]) => (Object.entries({
            //         ...new TextStyle({className, style}).cssRoot,
            //     })))
            // )
        };
    }

    private readonly options: TailwindcssSemanticTypographyOptions;

    constructor(options: unknown) {
        this.options = new TailwindcssSemanticTypographyOptions(options);
    }
}
