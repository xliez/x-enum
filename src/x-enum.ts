// type of `value`
type EnumValue = string | number;

/**
 * type of key-value-label
 * @example { key: [0, '例子'] } 包含中文label
 * @example { key: [0] } 不包含中文label，用于key即是lābel的情况
 */
type KVL<T extends string, V extends EnumValue> = Record<T, [V, string?]>;
type VLObj = { value: EnumValue; label?: string; key: string };
type OptionType = {
  label: string;
  value: EnumValue;
  [key: string]: string | number;
};

/**
 * 枚举工具类
 */
export class EnumTool<T extends string, V extends EnumValue> {
  private kvMap: { [key in T]: VLObj } = {} as any;

  private optionNames: [string, string] = ["label", "value"];

  private optionsCache: null | OptionType[] = null;

  public _TYPE_!: V;

  constructor(kvl: KVL<T, V>) {
    Object.keys(kvl).forEach(key => {
      const [value, label] = kvl[key as T];
      this.kvMap[key as T] = { value, label: label ?? key, key };
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
        label: label ?? key,
        value,
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

export const xEnum = <T extends string, V extends EnumValue>(
  kvls: KVL<T, V>
) => {
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
    _TYPE_: e._TYPE_,
  };
};
