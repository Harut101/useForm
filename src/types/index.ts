import { MutableRefObject } from "react";

export type FieldName = string;
export type FieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
export type FieldValueType = string | number | object | boolean | null | undefined;
export type ValidatorFuncType = (value: FieldValueType) => ValidatedResultType;
export type ValidatedResultType = { valid: boolean; message?: string };
export type SubmitHandlerType = (form: Form) => void;
export type TestValidatorFuncType = (value: FieldValueType) => boolean;
export type StateType = "value" | "checked";

export type Mode = "controlled" | "uncontrolled";

export interface ConfigOption {
  mode?: Mode;
  updateBackupForm?: boolean;
}

export interface FieldsType {
  [key: string]: FieldValueType;
}

export interface ValidatorsType {
  [key: string]: ValidatorFuncType[] | [];
}

export interface Form {
  [key: string]: FieldValueType;
}

export interface FieldRefsType {
  [key: string]: MutableRefObject<any>;
}

export interface Schema {
  fields: FieldsType;
  validators: ValidatorsType;
  transforms: {
    [key: string]: (value: FieldValueType) => FieldValueType;
  };
}

export interface Errors {
  [key: string]: string | undefined;
}