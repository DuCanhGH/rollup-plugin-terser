import type { SourceMapInput } from "rollup";
import type { MinifyOptions } from "terser";
import { minify } from "terser";

interface TransformReturnType {
  code: string;
  map: SourceMapInput;
}

const transform = async (
  code: string,
  optionsString: MinifyOptions
): Promise<TransformReturnType> => {
  return await minify(code, optionsString).then((a) => ({
    code: a.code ?? "",
    map: a.map as SourceMapInput,
  }));
};

export { transform };
