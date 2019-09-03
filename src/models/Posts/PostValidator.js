export function validate(payload) {
  const errors = {};
  if (!payload.name) {
    errors.name = "Нет заголовка";
  }
  if (!payload.shortDescription) {
    errors.shortDescription = "Нет краткого описания";
  }
  if (!payload.description) {
    errors.description = "Нет полного описания";
  }

  if (Object.keys(errors).length === 0) {
    return false;
  } else {
    return errors;
  }
}
