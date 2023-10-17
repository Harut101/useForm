import { MutableRefObject } from "react";

export type FieldValueType = string | number | object | boolean | null | undefined;
export type ValidatorFuncType = (value: FieldValueType) => ValidatedResultType;
export type ValidatedResultType = { valid: boolean; message?: string };
export type SubmitHandlerType = (form: Form) => void;
export type TestValidatorFuncType = (value: FieldValueType) => boolean;
export type StateType = "value" | "checked";

export type FieldsType = {
  [key: string]: FieldValueType;
};

export type ValidatorsType = {
  [key: string]: ValidatorFuncType[] | [];
};

export type Form = {
  [key: string]: FieldValueType;
};

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
