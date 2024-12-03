export async function bundle() {
    const res = await Bun.build({
        entrypoints: ["./src/index.ts"],
        outdir: "./out",
        target: "browser",
    });
    if (!res.success) {
        console.dir(res);
    }
    return res.success;
}

if (import.meta.main) {
    console.log("bundling...");
    const success = await bundle();
    console.log(success ? "bundled" : "failed to bundle");
    // Exit
    process.exit(success ? 0 : 1);
}
