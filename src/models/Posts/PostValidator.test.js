import { getErrors } from "./PostValidator";

describe("PostValidator", () => {
  test("Возвращает false, когда присутствуют все поля", () => {
    expect(
      getErrors({ name: "ad", description: "fadsf", shortDescription: "sdf" })
    ).toBe(false);
  });
  test("Возвращает ошибки по всем незаполненным полям", () => {
    expect(getErrors()).toEqual({
      name: expect.any(String),
      description: expect.any(String),
      shortDescription: expect.any(String)
    });
  });
});
