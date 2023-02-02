import { useState, useCallback, useTransition, useRef, SyntheticEvent, FormEvent, } from "react";
import { Errors, Schema, SubmitHandlerType, FieldType, FieldRefsType, isString, } from "@types";
import { validateForm } from "@utils";

function isEmpty(errors: Errors): boolean {
    return Object.keys(errors).length === 0;
}

function useForm(schema: Schema, submitHandler: SubmitHandlerType) {
    const [, startTransition] = useTransition();
    const [form, setForm] = useState({ ...schema.fields });
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [errors, setErrors] = useState<Errors>({});
    const fieldRefs = useRef<FieldRefsType>({});

    const onSubmit = useCallback(
        (e: SyntheticEvent) => {
            e.preventDefault();

            setSubmitted(true);

            let errors = validateForm(form, schema.validators);

            if (isEmpty(errors)) {
                submitHandler(form);
            } else {
                setErrors(errors);
            }
        },
        [form, schema.validators, submitHandler, setSubmitted, setErrors]
    );

    const onChange = useCallback(
        (e: FormEvent<HTMLInputElement>) => {
            e.preventDefault();

            const { name, value } = e.currentTarget;

            if (submitted) {
                const validatedResult = validateForm(form, { [name]: schema.validators[name] }, value);
                const errorsClone = { ...errors };

                if (isEmpty(validatedResult)) {
                    delete errorsClone[name];
                }
                startTransition(() => {
                    setErrors({ ...errorsClone, ...validatedResult });
                });
            }
            startTransition(() => {
                setForm({ ...form, [name]: value });
            });
        },
        [form, submitted, errors, schema.validators, setErrors, setForm]
    );

    const setValue = useCallback(
        (name: string, value: FieldType) => {
            if (submitted) {
                const validated = validateForm(form, { [name]: schema.validators[name] }, value);
                const errorsClone = { ...errors };

                if (isEmpty(validated)) {
                    delete errorsClone[name];
                }
                startTransition(() => {
                    setErrors({ ...errorsClone, ...validated });
                });
            }

            if (fieldRefs.current[name].current) {
                fieldRefs.current[name].current.value = value;
            }

            startTransition(() => {
                setForm({ ...form, [name]: value });
            });
        },
        [form, submitted, errors, schema.validators, setErrors, setForm]
    );

    const getValue = useCallback((name: string) => form[name], [form]);

    const setError = useCallback((name: string, message: string) => setErrors({ ...errors, [name]: message }), [errors]);

    const reset = useCallback(
        (name = null) => {
            if (name) {
                startTransition(() => {
                    setForm({ ...form, [name]: schema.fields[name] });
                });
                fieldRefs.current[name].current.value = schema.fields[name];
            } else {
                startTransition(() => {
                    setForm({ ...schema.fields });
                });
                for (const refName in fieldRefs.current) {
                    fieldRefs.current[refName].current.value = schema.fields[refName];
                }
            }
        },
        [form, schema.fields, setForm]
    );

    const register = (name: string) => {
        if (isString(name)) {
            const fieldRef = useRef<HTMLInputElement>();

            fieldRefs.current[name] = fieldRef;

            return {
                name,
                ref: fieldRef,
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

export default useForm;
