import { useEffect, useState, useCallback, useRef, SyntheticEvent, ChangeEvent } from "react";
import { validateForm, getField, setFieldValue, isCheckboxInput, isEmpty } from "@utils";
import {
  FieldValueType,
  FieldName,
  Errors,
  Schema,
  SubmitHandlerType,
  FieldElement,
  ConfigOption,
  SetValueOption,
  FormModeEnum,
  SetValueModeEnum,
  Mode,
} from "@types";

const defaultConfigOption = {
  mode: FormModeEnum.uncontrolled,
  updateBackupForm: false,
};

export const useForm = (schema: Schema, submitHandler: SubmitHandlerType, configOption: ConfigOption = {}) => {
  const backUpForm = useRef({ ...schema.fields });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isDraft, setIsDraft] = useState(false);
  const [controlledForm, setControlledForm] = useState({ ...schema.fields });
  const form = useRef({ ...schema.fields });
  const timer = useRef<NodeJS.Timeout | null>(null);

  const config = { ...defaultConfigOption, ...configOption };

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const validate = useCallback(
    (name: FieldName, value: FieldValueType) => {
      const formToValidate = config.mode === FormModeEnum.controlled ? controlledForm : form.current;
      const validated = validateForm(formToValidate, { [name]: schema.validators[name] }, value);

      setErrors((errors) => {
        const errorClone = { ...errors } as Errors;

        if (isEmpty(validated)) delete errorClone[name];

        return { ...errorClone, ...validated };
      });
    },
    [schema.validators, controlledForm, config]
  );

  const onSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();

      setSubmitted(true);

      const formToValidate = config.mode === FormModeEnum.controlled ? controlledForm : form.current;

      const errors = validateForm(formToValidate, schema.validators);

      setErrors(errors);

      if (isEmpty(errors)) {
        submitHandler(formToValidate);

        timer.current = setTimeout(() => setIsDraft(false), 300);

        if (config.updateBackupForm) backUpForm.current = formToValidate;
      }
    },
    [submitHandler, schema.validators, controlledForm, config]
  );

  const assignValue = useCallback((name: FieldName, value: FieldValueType, mode: Mode, option?: SetValueOption) => {
    if (mode === FormModeEnum.controlled) {
      setControlledForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      form.current[name] = value;
    }

    if (!option || option?.mode !== SetValueModeEnum.silent) setIsDraft(true);
  }, []);

  const handleChange = useCallback(
    (name: FieldName, value: FieldValueType) => {
      if (submitted) validate(name, value);

      assignValue(name, value, config.mode);
    },
    [submitted, schema.validators, config, assignValue, validate]
  );

  const setValue = useCallback(
    (name: FieldName, value: FieldValueType, option?: SetValueOption) => {
      if (submitted) validate(name, value);

      assignValue(name, value, config.mode, option);
    },
    [submitted, config, assignValue, validate]
  );

  const getValue = useCallback(
    (name: FieldName) => (config.mode === FormModeEnum.controlled ? controlledForm[name] : form.current[name]),
    [config]
  );

  const setError = useCallback((name: FieldName, message: string) => setErrors({ ...errors, [name]: message }), [errors]);

  const reset = useCallback(
    (name = null) => {
      const { mode } = config;

      setIsDraft(false);

      if (name) {
        if (mode === FormModeEnum.controlled) {
          setControlledForm((prev) => ({ ...prev, [name]: backUpForm.current[name] }));
        } else {
          form.current[name] = backUpForm.current[name];
        }
      } else {
        if (mode === FormModeEnum.controlled) {
          setControlledForm({ ...backUpForm.current });
        } else {
          form.current = { ...backUpForm.current };
        }
      }
    },
    [config]
  );

  const register = useCallback(
    (name: FieldName) => {
      const fieldObj = {
        name,
        ref: (_ref: FieldElement) => {
          const field = getField(_ref) as FieldElement;

          if (field && config.mode === FormModeEnum.uncontrolled) {
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
    [config, handleChange]
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
