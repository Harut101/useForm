const cache = new Map();

export default function getField(name: string, field: HTMLElement): HTMLInputElement | null {
  if (cache.has(name)) {
    return cache.get(name);
  }

  if (field.nodeName === "INPUT" || field.nodeName === "TEXTAREA") {
    cache.set(name, field);
    return field as HTMLInputElement;
  }

  const input = field.querySelector(`[name=${name}]`);
  const textField = input instanceof HTMLInputElement ? input : null;

  if (textField) {
    cache.set(name, textField);
  }

  return textField;
}
