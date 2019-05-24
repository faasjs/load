import loadConfig from './load_config';
import loadResource from './load_resource';

/**
 * 加载流程对象的云资源配置
 * 
 * @param flow {Flow} 流程对象
 * @param root {string} 起始路径
 * @param file {string} 流程文件路径
 * @param staging {string} 环境
 */
export default function loadFlow (flow: any, root: string, file: string, staging: string) {
  const providers = loadConfig(root, file, staging);

  flow.resource = loadResource({ function: flow.resource }, providers).function;
  flow.triggers = loadResource(flow.triggers || {}, providers);
  flow.resources = loadResource(flow.resources || {}, providers);

  return flow;
}
