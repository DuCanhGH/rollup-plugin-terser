import typescript from "@rollup/plugin-typescript";
import { defineConfig } from "rollup";

export default defineConfig({
  input: "src/index.ts",
  output: [
    {
      file: "dist/ducanh2912-rollup-plugin-terser.module.mjs",
      format: "es",
    },
    {
      file: "dist/ducanh2912-rollup-plugin-terser.cjs",
      format: "cjs",
      exports: "named",
    },
  ],
  plugins: [
    typescript({
      noForceEmit: true,
      noEmitOnError: true,
      declaration: true,
      declarationDir: "dist",
    }),
  ],
  external: ["rollup", "terser", "@babel/code-frame"],
});
