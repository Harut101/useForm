import { useEffect, useState, useCallback, useRef, SyntheticEvent, ChangeEvent } from "react";
import { validateForm, getField, setFieldValue, isCheckboxInput, isEmpty } from "@utils";
import { FieldValueType, FieldName, Errors, Schema, SubmitHandlerType, FieldElement, ConfigOption, Mode } from "form-manager-hook";

const defaultConfigOption = {
  mode: "uncontrolled",
  updateBackupForm: false,
};

const fieldsNodeMap = new Map();

export const useForm = (schema: Schema, submitHandler: SubmitHandlerType, configOption: ConfigOption = {}) => {
  const backUpForm = useRef({ ...schema.fields });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isDraft, setIsDraft] = useState(false);
  const [controlledForm, setControlledForm] = useState({ ...schema.fields });
  const form = useRef({ ...schema.fields });

  const option = { ...defaultConfigOption, ...configOption };

  useEffect(() => {
    return () => fieldsNodeMap.clear();
  }, []);

  const validate = useCallback(
    (name: FieldName, value: FieldValueType) => {
      const formToValidate = option.mode === "controlled" ? controlledForm : form.current;
      const validated = validateForm(formToValidate, { [name]: schema.validators[name] }, value);

      setErrors((errors) => {
        const errorClone = { ...errors } as Errors;

        if (isEmpty(validated)) delete errorClone[name];

        return { ...errorClone, ...validated };
      });
    },
    [schema.validators, controlledForm, option]
  );

  const onSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();

      setSubmitted(true);

      const formToValidate = option.mode === "controlled" ? controlledForm : form.current;

      const errors = validateForm(formToValidate, schema.validators);

      setErrors(errors);

      if (isEmpty(errors)) {
        submitHandler(formToValidate);
        setIsDraft(false);
        if (option.updateBackupForm) backUpForm.current = formToValidate;
      }
    },
    [submitHandler, schema.validators, controlledForm, option]
  );

  const assignValue = useCallback((name: FieldName, value: FieldValueType, mode: string) => {
    if (mode === "controlled") {
      setControlledForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      form.current[name] = value;
    }
    setIsDraft(true);
  }, []);

  const handleChange = useCallback(
    (name: FieldName, value: FieldValueType) => {
      if (submitted) validate(name, value);

      assignValue(name, value, option.mode);
    },
    [submitted, schema.validators, option, assignValue, validate]
  );

  const setValue = useCallback(
    (name: FieldName, value: FieldValueType) => {
      if (submitted) validate(name, value);

      assignValue(name, value, option.mode);
    },
    [submitted, option, assignValue, validate]
  );

  const getValue = useCallback((name: FieldName) => (option.mode === "controlled" ? controlledForm[name] : form.current[name]), [option]);

  const setError = useCallback((name: FieldName, message: string) => setErrors({ ...errors, [name]: message }), [errors]);

  const reset = useCallback(
    (name = null) => {
      const { mode } = option;

      if (name) {
        if (mode === "controlled") {
          setControlledForm((prev) => ({ ...prev, [name]: backUpForm.current[name] }));
        } else {
          form.current[name] = backUpForm.current[name];
        }
      } else {
        if (mode === "controlled") {
          setControlledForm({ ...backUpForm.current });
        } else {
          form.current = { ...backUpForm.current };
        }
      }
    },
    [option]
  );

  const register = useCallback(
    (name: FieldName) => {
      const fieldObj = {
        name,
        ref: (_ref: FieldElement) => {
          if (!fieldsNodeMap.has(name)) fieldsNodeMap.set(name, getField(_ref) as FieldElement);

          const field = fieldsNodeMap.get(name);

          if (field && option.mode === "uncontrolled") {
            setFieldValue(field, form.current[name]);
          }
        },
        onChange: (event: ChangeEvent<FieldElement>) => {
          event.stopPropagation();
          if (!fieldsNodeMap.has(name)) fieldsNodeMap.set(name, getField(event.target) as FieldElement);

          const field = fieldsNodeMap.get(name);

          const prop = isCheckboxInput(field) ? "checked" : "value";

          handleChange(name, (event.target as HTMLInputElement)[prop]);
        },
      };

      return fieldObj;
    },
    [option, handleChange]
  );

  return {
    form: controlledForm,
    errors,
    submitted,
    isDraft,
    register,
    onSubmit,
    setValue,
    getValue,
    setError,
    reset,
  };
};
