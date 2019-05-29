## Classes

<dl>
<dt><a href="#Config">Config</a></dt>
<dd><p>配置类</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#loadConfig">loadConfig(root, filename)</a></dt>
<dd><p>加载配置</p>
</dd>
<dt><a href="#loadResource">loadResource(targets, configs)</a></dt>
<dd><p>加载补全云资源配置</p>
</dd>
<dt><a href="#loadFlow">loadFlow(flow, root, file, staging)</a></dt>
<dd><p>加载流程对象的云资源配置</p>
</dd>
<dt><a href="#loadTs">loadTs(filename, options)</a></dt>
<dd><p>加载 ts 文件</p>
</dd>
</dl>

<a name="Config"></a>

## Config
配置类

**Kind**: global class  
<a name="new_Config_new"></a>

### new Config(root, filename)
创建配置类，并自动读取配置内容


| Param | Type | Description |
| --- | --- | --- |
| root | <code>string</code> | 根目录 |
| filename | <code>filename</code> | 目标文件，用于读取目录层级 |

<a name="loadConfig"></a>

## loadConfig(root, filename)
加载配置

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| root | <code>string</code> | 根目录 |
| filename | <code>filename</code> | 目标文件，用于读取目录层级 |

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

<a name="loadTs"></a>

## loadTs(filename, options)
加载 ts 文件

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| filename | <code>string</code> | 完整源文件路径 |
| options | <code>object</code> | 配置项 |
| options.input | <code>object</code> | 读取配置 |
| options.output | <code>object</code> | 写入配置 |
| options.tmp | <code>boolean</code> | 是否为临时文件，true 则生成的文件会被删除，默认为 false |

