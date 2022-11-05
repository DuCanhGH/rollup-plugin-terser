import { codeFrameColumns } from "@babel/code-frame";
import type { Plugin } from "rollup";
import type { MinifyOptions } from "terser";

import { transform } from "./transform.js";

type Options = Omit<MinifyOptions, "sourceMap">;

function terser(userOptions: Options = {}): Plugin {
  // @ts-expect-error mf omitted the value `sourceMap` from the type
  if (userOptions.sourceMap != null) {
    throw Error(
      "sourceMap option is removed. This value is inferred from rollup's output options."
    );
  }
  // @ts-expect-error mf omitted the value `sourceMap` from the type
  if (userOptions.sourcemap != null) {
    throw Error(
      "sourcemap option is removed. This value is inferred from rollup's output options."
    );
  }
  return {
    name: "terser",
    async renderChunk(code, _chunk, outputOptions) {
      const defaultOptions: MinifyOptions = {
        sourceMap:
          outputOptions.sourcemap === true ||
          typeof outputOptions.sourcemap === "string",
        module: false,
        toplevel: false,
      };
      if (outputOptions.format === "es") {
        defaultOptions.module = true;
      }
      if (outputOptions.format === "cjs") {
        defaultOptions.toplevel = true;
      }
      const normalizedOptions = { ...defaultOptions, ...userOptions };
      try {
        const result = await transform(code, normalizedOptions);
        return result;
      } catch (error) {
        // @ts-expect-error unknown error type
        const { message, line, col: column } = error;
        console.error(
          codeFrameColumns(code, { start: { line, column } }, { message })
        );
        throw error;
      }
    },
  };
}

export { terser };
export default terser;
