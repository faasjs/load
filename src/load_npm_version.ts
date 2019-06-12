import { execSync } from 'child_process';

/**
 * 获取 npm 当前安装的版本号
 * @param name {string} npm 包的名字
 */
export default function loadNpmVersion (name: string) {
  return execSync(`yarn list ${name}`).toString().match(/@([0-9a-z.-]+)[^@]*\n/)![1];
}
