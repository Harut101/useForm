import { useState, useCallback, useRef, SyntheticEvent, ChangeEvent } from "react";
import { validateForm, getField, setFieldValue, isCheckboxInput } from "@utils";
import { FieldValueType, FieldName, Errors, Schema, SubmitHandlerType, FieldElement } from "form-manager-hook";

function isEmpty(obj: Errors) {
  return Object.keys(obj).length === 0;
}

export const useForm = (schema: Schema, submitHandler: SubmitHandlerType) => {
  const [formFields] = useState({ ...schema.fields });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const form = useRef({ ...schema.fields });

  const validate = useCallback(
    (name: FieldName, value: FieldValueType) => {
      const validated = validateForm(form.current, { [name]: schema.validators[name] }, value);

      setErrors((errors) => {
        const errorClone = { ...errors } as Errors;

        if (isEmpty(validated)) delete errorClone[name];

        return { ...errorClone, ...validated };
      });
    },
    [schema.validators]
  );

  const onSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();

      setSubmitted(true);

      let errors = validateForm(form.current, schema.validators);

      setErrors(errors);

      if (isEmpty(errors)) {
        submitHandler(form.current);
      }
    },
    [submitHandler, schema.validators]
  );

  const handleChange = useCallback(
    (name: FieldName, value: FieldValueType) => {
      if (submitted) {
        validate(name, value);
      }

      form.current[name] = value;
    },
    [submitted, schema.validators, validate]
  );

  const setValue = useCallback(
    (name: FieldName, value: FieldValueType) => {
      if (submitted) {
        validate(name, value);
      }
      form.current[name] = value;
    },
    [submitted, validate]
  );

  const getValue = useCallback((name: FieldName) => form.current[name], []);

  const setError = useCallback((name: FieldName, message: string) => setErrors({ ...errors, [name]: message }), [errors]);

  const reset = useCallback(
    (name = null) => {
      if (name) {
        form.current[name] = formFields[name];
      } else {
        form.current = { ...formFields };
      }
    },
    [formFields]
  );

  const register = useCallback(
    (name: FieldName) => {
      const fieldObj = {
        name,
        ref: (_ref: FieldElement) => {
          const field = getField(_ref) as FieldElement;

          if (field) {
            setFieldValue(field, form.current[name]);
          }
        },
        onChange: (event: ChangeEvent<FieldElement>) => {
          event.stopPropagation();
          const field = getField(event.target) as FieldElement;

          const prop = isCheckboxInput(field) ? "checked" : "value";

          handleChange(name, (event.target as HTMLInputElement)[prop]);
        },
      };

      return fieldObj;
    },
    [form, handleChange]
  );

  return {
    errors,
    submitted,
    register,
    onSubmit,
    setValue,
    getValue,
    setError,
    reset,
  };
};
