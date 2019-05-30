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

