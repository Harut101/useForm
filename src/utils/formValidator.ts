import { Form, ValidatorsType, ValidatorFuncType, Errors, FieldType, } from "@types";

export function validateForm(form: Form, formValidators: ValidatorsType, value: FieldType = null) {
    const errors: Errors = {};
    for (const field in formValidators) {
        const fieldValidators: ValidatorFuncType[] = formValidators[field];

        for (let i = 0; i < fieldValidators.length; i++) {
            const validate: ValidatorFuncType = fieldValidators[i];
            const processValue = value !== null ? value : form[field];
            let result = validate(processValue);

            if (!result.valid) {
                errors[field] = result.message;
                break;
            }
        }
    }

    return errors;
}
