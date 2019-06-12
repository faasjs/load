import deepMerge from '@faasjs/deep_merge';
import { existsSync, readFileSync } from 'fs';
import { safeLoad } from 'js-yaml';

/**
 * 配置类
 */
export class Config {
  public readonly root: string;
  public readonly filename: string;
  public readonly origin: {
    defaults: {
      [key: string]: any;
    };
    [key: string]: {
      [key: string]: any;
    };
  }
  public readonly defaults: {
    [key: string]: any;
  };
  [key: string]: any;

  /**
   * 创建配置类，并自动读取配置内容
   * 
   * @param root {string} 根目录
   * @param filename {filename} 目标文件，用于读取目录层级
   */
  constructor (root: string, filename: string) {
    this.root = root;

    if (!this.root.endsWith('/')) {
      this.root += '/';
    }

    this.filename = filename;

    const configs: { [key: string]: any }[] = [];

    const paths = filename.replace(root, '').replace(/\/[^/]+$/, '').split('/');

    const roots = root.split('/');
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

    this.origin = deepMerge.apply(null, configs);

    if (!this.origin.defaults) {
      throw Error('[faas.yaml] need defaults env.');
    }

    this.defaults = deepMerge(this.origin.defaults);

    for (const key in this.origin) {
      if (this.origin.hasOwnProperty(key)) {
        if (key !== 'defaults') {
          this[key as string] = deepMerge(this.origin.defaults, this.origin[key as string]);
        }

        const data = this[key as string];

        if (!data.providers) {
          throw Error(`[faas.yaml] missing key: ${key}/providers`);
        }

        if (!data.plugins) {
          throw Error(`[faas.yaml] missing key: ${key}/plugins`);
        }

        for (const pluginKey in data.plugins) {
          if (data.plugins.hasOwnProperty(pluginKey)) {
            const plugin = data.plugins[pluginKey as string];
            plugin.name = pluginKey;
            if (plugin.provider) {
              if (typeof plugin.provider === 'string') {
                if (!data.providers[plugin.provider]) {
                  throw Error(`[faas.yaml] missing provider: ${plugin.provider} <${key}/plugins/${pluginKey}>`);
                }
                plugin.provider = data.providers[plugin.provider];
              } else {
                plugin.provider = deepMerge(data.providers[plugin.provider], plugin.provider);
              }
            }
          }
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
