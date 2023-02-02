import {
  useState,
  useCallback,
  useTransition,
  useRef,
  SyntheticEvent,
  FormEvent,
} from "react";
import {
  Errors,
  Schema,
  SubmitHandlerType,
  FieldType,
  FieldRefsType,
  isString,
} from "@types";
import { validateForm } from "@utils";

function isEmpty(errors: Errors): boolean {
  return Object.keys(errors).length === 0;
}

export function useForm(schema: Schema, submitHandler: SubmitHandlerType) {
  const form = useRef({ ...schema.fields });
  const fields = useRef<FieldRefsType>({});
  const formState = useRef<Errors>({});
  const [, startTransition] = useTransition();
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();

      setSubmitted(true);

      let errors = validateForm(form.current, schema.validators);

      if (isEmpty(errors)) {
        submitHandler(form.current);
      } else {
        formState.current = errors;
        setErrors(errors);
      }
    },
    [schema.validators, submitHandler, setSubmitted, setErrors]
  );

  const onChange = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      e.preventDefault();

      const { name, value } = e.currentTarget;

      if (submitted) {
        const validatedResult = validateForm(
          form.current,
          { [name]: schema.validators[name] },
          value
        );
        const errorsClone = { ...formState.current };

        if (isEmpty(validatedResult)) {
          delete errorsClone[name];
        }
        formState.current = { ...errorsClone, ...validatedResult };
        startTransition(() => {
          setErrors({ ...errorsClone, ...validatedResult });
        });
      }

      form.current[name] = value;
    },
    [submitted, schema.validators, setErrors]
  );

  const setValue = useCallback(
    (name: string, value: FieldType) => {
      if (submitted) {
        const validatedResult = validateForm(
          form.current,
          { [name]: schema.validators[name] },
          value
        );
        const errorsClone = { ...formState.current };

        if (isEmpty(validatedResult)) {
          delete errorsClone[name];
        }
        formState.current = { ...errorsClone, ...validatedResult };
        startTransition(() => {
          setErrors({ ...errorsClone, ...validatedResult });
        });
      }

      if (fields.current[name].current) {
        fields.current[name].current.value = value;
      }

      form.current[name] = value;
    },
    [submitted, schema.validators, setErrors]
  );

  const getValue = useCallback((name: string) => form.current[name], []);

  const setError = useCallback(
    (name: string, message: string) =>
      setErrors({ ...formState.current, [name]: message }),
    []
  );

  const reset = useCallback(
    (name = null) => {
      if (name) {
        form.current[name] = schema.fields[name];
        fields.current[name].current.value = schema.fields[name];
      } else {
        form.current = { ...schema.fields };
        for (const refName in fields.current) {
          fields.current[refName].current.value = schema.fields[refName];
        }
      }
    },
    [schema.fields]
  );

  const register = (name: string) => {
    if (isString(name)) {
    //   const fieldRef = useRef<HTMLInputElement>();

    //   fields.current[name] = fieldRef;

      return {
        name,
        // ref: fieldRef,
        onChange,
      };
    } else {
      throw Error("invalid name type");
    }
  };

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
} 