import { xEnum } from "../src/index";

describe("xEnum", () => {
  const e = xEnum({
    TODO: [0, "待办"],
    PENDING: [1, "处理中"],
    DONE: [2, "已完成"],
  });

  it("valueByKey ", () => {
    expect(e.TODO.value).toBe(0);
  });

  it("lableByKey", () => {
    expect(e.TODO.label).toBe("待办");
  });

  it("labelByValue", () => {
    expect(e.labelByValue(0)).toBe("待办");
  });

  it("keyByValue", () => {
    expect(e.keyByValue(0)).toBe("TODO");
  });

  it("genOptions", () => {
    expect(e.genOptions()).toEqual([
      { label: "待办", value: 0 },
      { label: "处理中", value: 1 },
      { label: "已完成", value: 2 },
    ]);
  });

  it("keys", () => {
    expect(e.keys).toEqual(["TODO", "PENDING", "DONE"]);
  });

  it("values", () => {
    expect(e.values).toEqual([0, 1, 2]);
  });

  it("labels", () => {
    expect(e.labels).toEqual(["待办", "处理中", "已完成"]);
  });
});

describe("xEnum2", () => {
  const e = xEnum({
    待办: [0],
    处理中: [1],
    已完成: [2],
  });

  it("valueByKey ", () => {
    expect(e.待办.value).toBe(0);
  });

  it("lableByKey", () => {
    expect(e.待办.label).toBe("待办");
  });

  it("labelByValue", () => {
    expect(e.labelByValue(0)).toBe("待办");
  });

  it("keyByValue", () => {
    expect(e.keyByValue(0)).toBe("待办");
  });

  it("genOptions", () => {
    expect(e.genOptions()).toEqual([
      { label: "待办", value: 0 },
      { label: "处理中", value: 1 },
      { label: "已完成", value: 2 },
    ]);
  });

  it("keys", () => {
    expect(e.keys).toEqual(["待办", "处理中", "已完成"]);
  });

  it("values", () => {
    expect(e.values).toEqual([0, 1, 2]);
  });

  it("labels", () => {
    expect(e.labels).toEqual(["待办", "处理中", "已完成"]);
  });
});
