import CG from "./CG";

describe("CG", () => {
  test("Возвращает правильно сгенерированное имя класса", () => {
    expect(
      CG("block", "element", ["modifier_1", "modifier_2", "modifier_3"])
    ).toBe(
      "block__element block__element--modifier_1 block__element--modifier_2 block__element--modifier_3"
    );
    expect(CG("block", "element", [""])).toBe("block__element");
    expect(CG("block", "element", [])).toBe("block__element");
    expect(CG("block")).toBe("block");
  });

  test("Сообщает об ошибке при некорректном наборе аргументов", () => {
    expect(() => CG()).toThrow();
    expect(() => CG(42)).toThrow();
    expect(() => CG("block", 42)).toThrow();
    expect(() => CG("block", "element", "modifier")).toThrow();
    expect(() => CG("block", "element", [42])).toThrow();
  });
});
