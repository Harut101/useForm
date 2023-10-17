import { isCheckboxInput, isRadioInput, isSelect } from "@utils";
import { FieldElement, FieldValueType } from "@types";

export const setFieldValue = (field: FieldElement, value: FieldValueType) => {
  if (isCheckboxInput(field) || isRadioInput(field)) {
    (field as HTMLInputElement).checked = value as boolean;
  } else if (isSelect(field)) {
    const selectElement = field as HTMLSelectElement;
    for (let option of selectElement.options) {
      if (option.value === value) {
        option.selected = true;
        break;
      }
    }
  } else {
    field.value = value as string;
  }
};
