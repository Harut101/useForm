import { FieldValueType, TestValidatorFuncType, ValidatedResultType } from "@types";

function isString(str: FieldValueType): str is string {
  return typeof str === "string";
}

export function number(message: string = "Value is invalid") {
  return (value: string): ValidatedResultType => {
    const valid = /^\d*\.?\d*$/.test(value);

    if (!valid) {
      return {
        valid,
        message,
      };
    }

    return { valid };
  };
}

export function integer(message: string = "Value is invalid") {
  return (value: string): ValidatedResultType => {
    const valid = /^\d+$/.test(value);

    if (!valid) {
      return {
        valid,
        message,
      };
    }

    return { valid };
  };
}

export function required(message: string = "This field is required.") {
  return (value: FieldValueType): ValidatedResultType => {
    const valid = isString(value) ? value.trim() !== "" : !!value;

    if (!valid) {
      return {
        valid,
        message,
      };
    }

    return { valid };
  };
}

export function min(minValue: string | number, message: string = "Value is invalid") {
  return (value: string): ValidatedResultType => {
    const valid = value >= minValue;

    if (!valid) {
      return {
        valid,
        message,
      };
    }

    return { valid };
  };
}

export function max(maxValue: string | number, message: string = "Value is invalid") {
  return (value: string): ValidatedResultType => {
    const valid = value <= maxValue;

    if (!valid) {
      return {
        valid,
        message,
      };
    }

    return { valid };
  };
}

export function minMax(minValue: string | number, maxValue: string | number, message: string = "Value is invalid") {
  return (value: string): ValidatedResultType => {
    const valid = value >= minValue && value <= maxValue;

    if (!valid) {
      return {
        valid,
        message,
      };
    }

    return { valid };
  };
}

export function test(validator: TestValidatorFuncType, message: string = "Value is invalid") {
  return (value: FieldValueType): ValidatedResultType => {
    const valid = validator(value);

    if (!valid) {
      return {
        valid,
        message,
      };
    }

    return { valid };
  };
}

export function email(message: string = "Value is invalid") {
  return (value: string): ValidatedResultType => {
    const valid = new RegExp(/^[-!#-'*+/-9=?^-~]+(?:\.[-!#-'*+/-9=?^-~]+)*@[-!#-'*+/-9=?^-~]+(?:\.[-!#-'*+/-9=?^-~]{2,20})+$/i).test(value);

    if (!valid) {
      return {
        valid,
        message,
      };
    }

    return { valid };
  };
}

const validators = {
  number,
  required,
  min,
  max,
  minMax,
  test,
  integer,
  email,
};

export default validators;
