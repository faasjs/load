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
  for (const type in targets) {
    if (targets.hasOwnProperty(type)) {
      const target = targets[type as string];
      if (!target.resource) {
        target.resource = Object.create(null);
      }

      let name = target.resource.name || type;

      let resource: any;
      if (configs.resources[name as string]) {
        resource = configs.resources[name as string];
      } else if (configs.resources.defaults && configs.resources.defaults[type as string]) {
        name = configs.resources.defaults[type as string];
        resource = configs.resources[name as string];
      }

      if (!resource) {
        throw Error(`Resource not found: ${name}#${type}`);
      }
      const targetResource = deepMerge(
        resource,
        { name },
        target.resource,
      );

      if (typeof targetResource!.provider === 'string') {
        if (!configs.providers[targetResource!.provider]) {
          throw Error(`Provider not found: ${targetResource!.provider}`);
        }
        targetResource!.provider = configs.providers[targetResource!.provider];
      }

      target.resource = targetResource;
    }
  }
}
