import { FieldType, ValidatedResultType, TestValidatorFuncType } from '@types';

const isString = (str: FieldType): str is string => typeof str === "string";

function number(message: string = "Value is invalid") {
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

function integer(message: string = "Value is invalid") {
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

function required(message: string = "This field is required.") {
    return (value: FieldType): ValidatedResultType => {
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

function min(minValue: string | number, message: string = "Value is invalid") {
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

function max(maxValue: string | number, message: string = "Value is invalid") {
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

function minMax(minValue: string | number, maxValue: string | number, message: string = "Value is invalid") {
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

function test(validator: TestValidatorFuncType, message: string = "Value is invalid") {
    return (value: FieldType): ValidatedResultType => {
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

function email(message: string = 'Value is invalid') {
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
    email
};

export default validators;
