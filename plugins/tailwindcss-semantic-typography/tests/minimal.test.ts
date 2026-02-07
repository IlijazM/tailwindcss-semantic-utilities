import {startDevServer} from "@/tests/uilts/dev-server.ts";
import {chromium} from "playwright";
import path from "path";

describe("minimal fixture", () => {
    let server: Awaited<ReturnType<typeof startDevServer>>;
    let browser: Awaited<ReturnType<typeof chromium.launch>>;

    beforeAll(async () => {
        const cwd = path.resolve(__dirname, "../fixtures/minimal");
        const port = 5177;

        server = await startDevServer({ cwd, port });
        browser = await chromium.launch();
    }, 90_000);

    afterAll(async () => {
        await browser?.close();
        await server?.stop();
    }, 30_000);

    it("renders expected HTML and computed CSS", async () => {
        const page = await browser.newPage();
        await page.goto(server.url, {waitUntil: "networkidle"});

        // HTML assertions
        const btn = page.locator(".text-display-1");
        await btn.waitFor();
        expect(await btn.textContent()).toContain("Display 1");

        // Computed CSS assertions (two options)

        // // Option A: getComputedStyle directly (super flexible)
        // const styles = await page.evaluate(() => {
        //     const el = document.querySelector("[data-testid='primary-button']") as HTMLElement;
        //     const cs = getComputedStyle(el);
        //     return {
        //         display: cs.display,
        //         backgroundColor: cs.backgroundColor,
        //         fontSize: cs.fontSize,
        //         borderRadius: cs.borderRadius,
        //     };
        // });
        //
        // expect(styles.display).toBe("inline-flex");
        // expect(styles.fontSize).toBe("14px");
        //
        // // Note: colors come back normalized, often as rgb(...)
        // expect(styles.backgroundColor).toMatch(/rgb\(/);

        // Option B: Playwright's built-in CSS matcher (nice ergonomics)
        // (requires: import { expect } from "@playwright/test" if you use that expect)
        // await expect(btn).toHaveCSS("display", "inline-flex");
    });

})

