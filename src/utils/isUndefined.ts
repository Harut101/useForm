import { FieldValueType } from "@types";

export const isUndefined = (val: FieldValueType): val is undefined => val === undefined;
