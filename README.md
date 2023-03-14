# enum-tool

管理枚举值的工具

## 动机

在业务中，我们经常需要维护一些枚举值，如状态、类型，这些枚举值包含 `key: 唯一键(一般为英文)`、`value: 值(对应后端存储的数据)`、`label: 中文名(用于展示)`。

有以下这些使用场景：

1. select 组件的 options: 一般为 `{ label: string; value: string | number }[]` 这样的数据
2. 根据 key 获取 value
3. 根据 key 获取 label
4. 根据 value 获取 label
5. 根据 value 获取 key

该函数工具封装了以上业务场景的方法，方便维护枚举值，并且**TS 支持 key 值的枚举推断**

## 使用方式

```ts
import { Select } from "antd";
import { xEnum } from "@xliez/enum-tool";

const TypeEnum = xEnum([
  ["TODO", 0, "待办"],
  ["PENDING", 1, "处理中"],
  ["DONE", 2, "已完成"],
]);

// 1. 生成 select 组件 options
const App = () => {
  return (
    <>
      <Select label="select" name="select" options={TypeEnum.genOptions()} />
    </>
  );
};

// 2. 根据 key 取 value
const value = TypeEnum.TODO.value; // 支持TS推断
// or
const value = TypeEnum.valueByKey("TODO");

// 3. 根据 key 取 label
const label = TypeEnum.TODO.label; // 支持TS推断
// or
const label = TypeEnum.labelByKey("TODO");

// 4. 根据 value 取 label
const label = TypeEnum.labelByValue(0);

// 5. 根据 value 取 key
const key = TypeEnum.keyByValue(0);

export default App;
```
