import {TailwindCssSemanticTypographyPlugin} from "@src/tailwindcss-semantic-typography.ts";

describe("TailwindCSS Semantic Typography", () => {
    it("Should generate default font styles", () => {
        const plugin = new TailwindCssSemanticTypographyPlugin({});
        expect(plugin.utilities)
    })
})