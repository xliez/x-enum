type EnumValue = string | number;
type KVL<T extends string> = [T, EnumValue, string?];
type VLObj = { value: EnumValue; label?: string };

/**
 * 枚举工具类
 */
export class EnumTool<T extends string> {
  private kvMap: { [key in T]: VLObj } = {} as any;

  private optionNames: [string, string] = ["label", "value"];

  private optionsCache: null | { [name: string]: EnumValue }[] = null;

  constructor(kvls: KVL<T>[]) {
    kvls.forEach(([key, value, label]) => {
      this.kvMap[key] = {
        value,
        label,
      };
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
}

export const xEnum = <T extends string>(kvls: KVL<T>[]) => {
  const e = new EnumTool(kvls);
  return {
    ...e.getMap(),
    valueByKey: e.valueByKey.bind(e),
    lableByKey: e.lableByKey.bind(e),
    labelByValue: e.labelByValue.bind(e),
    keyByValue: e.keyByValue.bind(e),
    genOptions: e.genOptions.bind(e),
  };
};
