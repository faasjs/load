import deepMerge from '@faasjs/deep_merge';
import { existsSync, readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';

/**
 * 读取指定环境的配置
 * 
 * @param root {string} 起始路径
 * @param file {string} 目标文件
 * @param staging {string} 环境
 */
export default function loadConfig (root: string, file: string, staging: string) {
  const configs: { [key: string]: any }[] = [];

  const paths = file.replace(root, '').replace(/\/[^/]+$/, '').split('/');

  const roots = root.split('/');
  roots.pop();
  paths.unshift(roots.pop() as string);
  paths.unshift(roots.join('/'));

  paths.reduce(function (base, path) {
    const root = base + '/' + path;
    const defaults = root + '/config/providers/defaults.yaml';

    if (existsSync(defaults)) {
      configs.push(safeLoad(readFileSync(defaults).toString()));
    }

    const env = root + '/config/providers/' + staging + '.yaml';
    if (existsSync(env)) {
      configs.push(safeLoad(readFileSync(env).toString()));
    }

    return root;
  });

  return deepMerge.apply(null, configs);
}
