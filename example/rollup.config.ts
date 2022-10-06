import { defineConfig } from "rollup";
import { terser } from "../src/index.js";

export default defineConfig({
  input: "src/index.js",
  output: {
    file: "dist/index.js",
    format: "es",
    banner: "#!/usr/bin/env node",
  },
  plugins: [terser()],
  external: [
    "axios",
    "fs",
    "inquirer",
    "ora",
    "path",
    "pdfkit",
    "radash",
    "sharp",
    "node-html-parser",
    "crypto",
  ],
});
