# enum-tool

管理枚举值的工具

## 动机

在业务中，我们经常需要维护一些枚举值，如状态、类型，这些枚举值包含 `key: 唯一键(一般为英文)`、`value: 值(对应后端存储的数据)`、`label: 中文名(用于展示)`。

有以下这些使用场景：

1. select 组件的options: 一般为 `{ label: string; value: string | number }[]` 这样的数据
2. 根据 key 获取 value
3. 根据 key 获取 label
4. 根据 value 获取 label
5. 根据 value 获取 key

该函数工具封装了以上业务场景的方法，方便维护枚举值

### 使用方式

```ts
import { Select } from 'antd';
import { EnumTool } from '@xliez/enum-tool';

const TypeEnum = new EnumTool([
    ['TODO', 0, '待办'],
    ['PENDING', 1, '处理中'],
    ['DONE', 2, '已完成']
] as const)

// 1. 生成 select 组件 options
const App = () => {
  return (
    <>
      <Select label="select" name="select" options={genOptions()} />
    </>
  );
};

// 2. 根据 key 取 value
const value = TypeEnum.valueByKey('TODO')

export default App;
```

### 定义

```ts
function enumTool(origin: Record<string, EnumValue>): {
  // 获取原始对象
  origin: Record<string, EnumValue>;
  // 根据 key 获取 value
  keyToVal: (key: string) => EnumValue;
  // 根据 value 获取 key
  valToKey: (value: EnumValue) => EnumValue;
  /* 生成 Select 组件的 options
   * names 为生成options数组中代表 label 和 value 的名称，默认为 ['label', 'value']
   * 如 genOptions(['name', 'id']) => 生成 [{ name: 'A', id: 'a' }, { name: 'B', id: 'b' }, { name: 'C', id: 'c' }]
   */
  genOptions: (names?: [string, string]) => {
    [labelName: string]: EnumValue;
  }[];
};
```
