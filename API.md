## Functions

<dl>
<dt><a href="#loadConfig">loadConfig(root, file, staging)</a></dt>
<dd><p>读取指定环境的配置</p>
</dd>
<dt><a href="#loadResource">loadResource(targets, configs)</a></dt>
<dd><p>加载补全云资源配置</p>
</dd>
<dt><a href="#loadFlow">loadFlow(flow, root, file, staging)</a></dt>
<dd><p>加载流程对象的云资源配置</p>
</dd>
</dl>

<a name="loadConfig"></a>

## loadConfig(root, file, staging)
读取指定环境的配置

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>string</code> | 起始路径 |
| file | <code>string</code> | 目标文件 |
| staging | <code>string</code> | 环境 |

<a name="loadResource"></a>

## loadResource(targets, configs)
加载补全云资源配置

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| targets | <code>object</code> | 解析对象 |
| configs | <code>object</code> | 云资源总配置 |

<a name="loadFlow"></a>

## loadFlow(flow, root, file, staging)
加载流程对象的云资源配置

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| flow | <code>Flow</code> | 流程对象 |
| root | <code>string</code> | 起始路径 |
| file | <code>string</code> | 流程文件路径 |
| staging | <code>string</code> | 环境 |

