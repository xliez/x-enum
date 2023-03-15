// type of `value`
type EnumValue = string | number;

/**
 * type of key-value-label
 * @example { key: [0, '例子'] } 包含中文label
 * @example { key: [0] } 不包含中文label，用于key即是lābel的情况
 */
type KVL<T extends string> = Record<T, [EnumValue, string?]>;
type VLObj = { value: EnumValue; label?: string };

/**
 * 枚举工具类
 */
export class EnumTool<T extends string> {
  private kvMap: { [key in T]: VLObj } = {} as any;

  private optionNames: [string, string] = ["label", "value"];

  private optionsCache: null | { [name: string]: EnumValue }[] = null;

  constructor(kvl: KVL<T>) {
    Object.keys(kvl).forEach(key => {
      const [value, label] = kvl[key as T];
      this.kvMap[key as T] = { value, label: label ?? key };
    });
  }

  public valueByKey(key: T) {
    return this.kvMap[key].value;
  }

  public lableByKey(key: T) {
    return this.kvMap[key].label;
  }

  public labelByValue(value: EnumValue) {
    return Object.values<VLObj>(this.kvMap).find(item => item.value === value)
      ?.label;
  }

  public keyByValue(value: EnumValue) {
    return Object.keys(this.kvMap).find(
      key => this.kvMap[key as T].value === value
    );
  }

  public genOptions(names?: [string, string]) {
    const [labelName, valueName] = names ?? ["label", "value"];
    if (
      labelName === this.optionNames[0] &&
      valueName === this.optionNames[1] &&
      this.optionsCache
    ) {
      return this.optionsCache;
    }
    this.optionsCache = Object.entries<VLObj>(this.kvMap).map(
      ([key, { value, label }]) => ({
        [labelName]: label ?? key,
        [valueName]: value,
      })
    );
    this.optionNames = [labelName, valueName];

    return this.optionsCache;
  }

  public getMap() {
    return this.kvMap;
  }

  public get keys() {
    return Object.keys(this.kvMap) as T[];
  }

  public get values() {
    return Object.values<VLObj>(this.kvMap).map(item => item.value);
  }

  public get labels() {
    return Object.values<VLObj>(this.kvMap).map(item => item.label);
  }
}

export const xEnum = <T extends string>(kvls: KVL<T>) => {
  const e = new EnumTool(kvls);
  return {
    ...e.getMap(),
    valueByKey: e.valueByKey.bind(e),
    lableByKey: e.lableByKey.bind(e),
    labelByValue: e.labelByValue.bind(e),
    keyByValue: e.keyByValue.bind(e),
    genOptions: e.genOptions.bind(e),
    keys: e.keys,
    values: e.values,
    labels: e.labels,
  };
};
