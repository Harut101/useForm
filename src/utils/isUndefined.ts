import { FieldValueType } from "form-manager-hook";

export const isUndefined = (val: FieldValueType): val is undefined => val === undefined;
