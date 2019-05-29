import deepMerge from '@faasjs/deep_merge';
import { existsSync, readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';

/**
 * 配置类
 */
export class Config {
  public readonly root: string;
  public readonly filename: string;
  public readonly all: {
    defaults: {
      [key: string]: any;
    };
    [key: string]: {
      [key: string]: any;
    };
  }
  [key: string]: any;

  /**
   * 创建配置类，并自动读取配置内容
   * 
   * @param root {string} 根目录
   * @param filename {filename} 目标文件，用于读取目录层级
   */
  constructor (root: string, filename: string) {
    this.root = root;
    this.filename = filename;

    const configs: { [key: string]: any }[] = [];

    const paths = filename.replace(root, '').replace(/\/[^/]+$/, '').split('/');

    const roots = root.split('/');
    roots.pop();
    paths.unshift(roots.pop() as string);
    paths.unshift(roots.join('/'));

    paths.reduce(function (base, path) {
      const root = base + '/' + path;
      const faas = root + '/faas.yaml';

      if (existsSync(faas)) {
        configs.push(safeLoad(readFileSync(faas).toString()));
      }

      return root;
    });

    this.all = deepMerge.apply(null, configs);

    if (!this.all.defaults) {
      throw Error('faas.yaml need defaults env.');
    }

    for (const key in this.all) {
      if (this.all.hasOwnProperty(key)) {
        if (key === 'defaults') {
          this[key as string] = this.all.defaults;
        } else {
          this[key as string] = deepMerge(this.all.defaults, this.all[key as string]);
        }
      }
    }
  }
}

/**
 * 加载配置
 * @param root {string} 根目录
 * @param filename {filename} 目标文件，用于读取目录层级
 */
export default function loadConfig (root: string, filename: string) {
  return new Config(root, filename);
}
