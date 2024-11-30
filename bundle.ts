export async function bundle() {
    await Bun.build({
        entrypoints: ["./src/index.ts"],
        outdir: "./out",
    });
}

if (import.meta.main) {
    console.log("bundling...");
    await bundle();
    console.log("bundled");
}
