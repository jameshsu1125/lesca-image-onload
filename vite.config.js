import { resolve } from "path";
import { defineConfig } from "vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import dtsPlugin from "vite-plugin-dts";
// https://vitejs.dev/config/
export default defineConfig({
    base: "./",
    root: resolve(__dirname, "src"),
    publicDir: resolve(__dirname, "public"),
    build: {
        emptyOutDir: true,
        outDir: "../lib",
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "index",
            fileName: "index",
            formats: ["es", "cjs"],
        },
    },
    css: {
        preprocessorOptions: {
            less: {
                math: "always",
                globalVars: {
                    mainColor: "red",
                },
            },
        },
    },
    resolve: {
        alias: {
            "@": resolve(__dirname, "src"),
        },
    },
    assetsInclude: [
        "**/*.gltf",
        "**/*.glb",
        "**/*.png",
        "**/*.jpg",
        "**/*.jpeg",
        "**/*.svg",
    ],
    plugins: [
        cssInjectedByJsPlugin(),
        dtsPlugin({ insertTypesEntry: true, outDir: "../lib" }),
    ],
    server: {
        open: true,
        port: 5173,
    },
});
