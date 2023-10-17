export function isString(value: string): value is string {
  return typeof value === "string";
}

export function isHtmlValue(value: any): value is string | number | boolean {
  return typeof value === "string" || typeof value === "number" || typeof value === "boolean";
}
