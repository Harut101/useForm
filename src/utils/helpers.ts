import { FieldValueType, Errors } from "form-manager-hook";

export const isUndefined = (val: FieldValueType): val is undefined => val === undefined;

export const isEmpty = (obj: Errors) => Object.keys(obj).length === 0;
