// test/utils/devServer.ts
import { spawn } from "node:child_process";
import { ChildProcess } from "child_process";

export type DevServerHandle = {
    proc: ChildProcess;
    url: string;
    stop: () => Promise<void>;
};

export async function startDevServer(opts: {
    cwd: string;                 // fixture dir
    command?: string;            // default: npm
    args?: string[];             // default: ["run","dev"]
    port: number;                // easiest: force a port
    readyRegex?: RegExp;         // detect readiness from stdout
    timeoutMs?: number;
}): Promise<DevServerHandle> {
    const {
        cwd,
        command = "npm",
        args = ["run", "dev", "--", "--port", String(opts.port), "--strictPort"],
        port,
        readyRegex = /(ready|listening|localhost)/i,
        timeoutMs = 60_000,
    } = opts;

    const proc = spawn(command, args, { cwd, stdio: ["ignore", "pipe", "pipe"], env: process.env });

    const url = `http://localhost:${port}`;
    let resolved = false;

    await new Promise<void>((resolve, reject) => {
        const t = setTimeout(() => {
            reject(new Error(`Dev server not ready within ${timeoutMs}ms (${cwd})`));
        }, timeoutMs);

        const onData = (buf: Buffer) => {
            const line = buf.toString("utf8");
            if (readyRegex.test(line) && !resolved) {
                resolved = true;
                clearTimeout(t);
                resolve();
            }
        };

        proc.stdout.on("data", onData);
        proc.stderr.on("data", onData);

        proc.on("exit", (code) => {
            if (!resolved) {
                clearTimeout(t);
                reject(new Error(`Dev server exited early with code ${code} (${cwd})`));
            }
        });
        proc.on("error", (err) => {
            if (!resolved) {
                clearTimeout(t);
                reject(err);
            }
        });
    });

    return {
        proc,
        url,
        stop: async () => {
            if (proc.killed) return;
            proc.kill("SIGTERM");
            await new Promise<void>((resolve) => proc.on("exit", () => resolve()));
        },
    };
}
