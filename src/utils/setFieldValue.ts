import { isCheckboxInput, isRadioInput, isSelect } from "@utils";
import { FieldElement, FieldValueType } from "@types";

export const setFieldValue = (field: FieldElement, value: FieldValueType) => {
  if (isCheckboxInput(field) || isRadioInput(field)) {
    field.checked = !!value;
  } else if (isSelect(field)) {
    for (let option of field.options) {
      if (option.value === value) {
        option.selected = true;
        break;
      }
    }
  } else {
    field.value = value as string;
  }
};
