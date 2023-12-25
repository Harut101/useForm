import { FieldValueType, Errors } from "@types";

export const isUndefined = (val: FieldValueType): val is undefined => val === undefined;

export const isEmpty = (obj: Errors) => Object.keys(obj).length === 0;
