import {TextStyle} from '@src/text-stlye/text-style.ts';
import {TailwindcssSemanticTypographyOptions} from "@src/options/tailwindcss-semantic-typography-options.ts";

export class TailwindCssSemanticTypographyPlugin {
    public get cssDeclarations() {
        return Object.fromEntries(
            Object.entries(this.options.semanticTypography).flatMap(([name, style]) => (Object.entries({
                ...new TextStyle({className: "text-" + name, style}).object
            })))
        );
    }

    public get themeExtension() {
        return {};
    }

    private readonly options: TailwindcssSemanticTypographyOptions;

    constructor(options: unknown) {
        this.options = new TailwindcssSemanticTypographyOptions(options);
    }
}
