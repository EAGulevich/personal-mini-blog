/** CG - className generator - Утилита, которая позволяет создавать имена классов по методологии БЭМ
 *  @param {String} block - название блока
 *  @param {String} element - название элементов
 *  @param {Array<String>} modifiers - массив строковых модификаторов
 *  @returns {String} - полное название класса
 */

export default function CG(block, element = "", modifiers = []) {
  if (!block) {
    throw new Error("Не найден первый параметр CG");
  } else if (typeof block !== "string") {
    throw new Error("Первый параметр CG должен быть строкой");
  } else if (typeof element !== "string") {
    throw new Error("Второй параметр CG должен быть строкой");
  } else if (!Array.isArray(modifiers)) {
    throw new Error("Третий параметр CG должен быть массивом строк");
  }

  let name = block;
  if (element) {
    name = name + "__" + element;
  }
  if (modifiers.length > 0) {
    let namesWithModifier = modifiers.map(modifier => {
      if (typeof modifier !== "string") {
        throw new Error("Третий параметр CG должен быть массивом строк");
      }
      if (!modifier) {
        return null;
      }
      return name + "--" + modifier;
    });

    namesWithModifier.forEach(nameWithModifier => {
      if (nameWithModifier === null) {
        return;
      }
      name = name + " " + nameWithModifier;
    });
  }

  return name;
}
