import { isUndefined } from "@utils";
import { FieldElement } from "form-manager-hook";

export const getField = (_ref: FieldElement) =>
  isUndefined(_ref?.value) ? (_ref?.querySelectorAll ? _ref?.querySelectorAll("input,select,textarea")[0] || _ref : _ref) : _ref;
