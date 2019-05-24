import deepMerge from '@faasjs/deep_merge';

/**
 * 加载补全云资源配置
 * 
 * @param targets {object} 解析对象
 * @param configs {object} 云资源总配置
 */
export default function loadResource (targets: {
  [key: string]: any;
}, configs: {
  resources: {
    [key: string]: any;
  };
  providers: {
    [key: string]: any;
  };
  [key: string]: any;
}) {
  for (const key in targets) {
    if (targets.hasOwnProperty(key)) {
      const target = targets[key as string];

      let name = target.name || target.type || key;

      let resource: any;
      if (configs.resources[name as string]) {
        resource = configs.resources[name as string];
      } else if (configs.resources.defaults && configs.resources.defaults[key as string]) {
        name = configs.resources.defaults[key as string];
        resource = configs.resources[name as string];
      }

      if (!resource) {
        throw Error(`Resource not found: ${name}#${key}`);
      }
      const targetResource = deepMerge(
        resource,
        { name },
        target
      );

      if (typeof targetResource!.provider === 'string') {
        if (!configs.providers[targetResource!.provider]) {
          throw Error(`Provider not found: ${targetResource!.provider}`);
        }
        targetResource!.provider = configs.providers[targetResource!.provider];
      }

      targets[key as string] = targetResource;
    }
  }

  return targets;
}
