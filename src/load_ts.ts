import deepMerge from '@faasjs/deep_merge';
import { unlinkSync } from 'fs';
import { execSync } from 'child_process';
import * as rollup from 'rollup';
import typescript from 'rollup-plugin-typescript2';

/**
 * 加载 ts 文件
 * 
 * @param filename {string} 完整源文件路径
 * @param options {object} 配置项
 * @param options.input {object} 读取配置
 * @param options.output {object} 写入配置
 * @param options.tmp {boolean} 是否为临时文件，true 则生成的文件会被删除，默认为 false
 */
export default async function loadTs (filename: string, options: {
  input?: {
    [key: string]: any;
  };
  output?: {
    [key: string]: any;
  };
  tmp?: boolean;
} = Object.create(null)) {
  const input = deepMerge({
    input: filename,
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            declaration: false,
            module: 'esnext'
          }
        }
      }),
    ]
  }, options.input || {});

  const bundle = await rollup.rollup(input);

  const dependencies = new Map();

  for (const m of bundle.cache.modules || []) {
    for (const d of m.dependencies) {
      if (!dependencies.has(d)) {
        dependencies.set(d, execSync(`npm view ${d} version`).toString());
      }
    }
  }

  const output = deepMerge({
    file: filename + '.tmp.js',
    format: 'cjs'
  }, options.output || {});

  await bundle.write(output);

  // eslint-disable-next-line @typescript-eslint/no-var-requires,security/detect-non-literal-require
  const module = require(output.file);

  if (options.tmp) {
    unlinkSync(output.file);
  }

  return {
    module,
    dependencies
  };
}
