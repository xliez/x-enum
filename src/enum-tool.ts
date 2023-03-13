type EnumValue = string | number;
type KVL = [string, EnumValue, string?];

/**
 * 枚举工具类
 */
export class EnumTool {
  private kvMap: Record<
    KVL[0],
    {
      value: KVL[1];
      label: KVL[2];
    }
  > = {};

  private optionNames: [string, string] = ["label", "value"];

  private optionsCache: null | { [name: string]: EnumValue }[] = null;

  constructor(kvls: Readonly<Readonly<KVL>[]>) {
    kvls.forEach(([key, value, label]) => {
      this.kvMap[key] = {
        value,
        label,
      };
    });
  }

  public valueByKey(key: string) {
    return this.kvMap[key].value;
  }

  public lableByKey(key: string) {
    return this.kvMap[key].label;
  }

  public labelByValue(value: EnumValue) {
    return Object.values(this.kvMap).find(item => item.value === value)?.label;
  }

  public keyByValue(value: EnumValue) {
    return Object.keys(this.kvMap).find(key => this.kvMap[key].value === value);
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
    this.optionsCache = Object.entries(this.kvMap).map(
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
