import { MutableRefObject } from "react";

export type FieldType = string | number | object | boolean | null | undefined;
export type ValidatorFuncType = (value: FieldType) => ValidatedResultType;
export type ValidatedResultType = { valid: boolean; message?: string };
export type SubmitHandlerType = (form: Form) => void;
export type TestValidatorFuncType = (value: FieldType) => boolean;
export type StateType = 'value' | 'checked';

export type FieldsType = {
  [key: string]: FieldType;
};

export type ValidatorsType = {
  [key: string]: ValidatorFuncType[] | [];
};

export type Form = {
  [key: string]: FieldType;
};

export interface FieldRefsType {
  [key: string]: MutableRefObject<any>;
}

export interface Schema {
  fields: FieldsType;
  validators: ValidatorsType;
  transforms: {
    [key: string]: (value: FieldType) => FieldType;
  };
}

export interface Errors {
  [key: string]: string | undefined;
}
