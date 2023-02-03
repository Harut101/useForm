export default function getField(name: string, field: HTMLElement): HTMLInputElement | null {
    if (field.nodeName === "INPUT" || field.nodeName === "TEXTAREA") {
      return field as HTMLInputElement;
    }
  
    const input = field.querySelector(`[name=${name}]`);
    return input instanceof HTMLInputElement ? input : null;
  }