import { useState, useCallback, useTransition, SyntheticEvent, FormEvent } from "react";
import { Errors, Schema, SubmitHandlerType, FieldType } from '@types';
import validateForm from "../utils/formValidator";

function isEmpty(errors: Errors): boolean {
    return Object.keys(errors).length === 0;
}

const useForm = (schema: Schema, submitHandler: SubmitHandlerType) => {
    const [, startTransition] = useTransition();
    const [form, setFormFields] = useState({ ...schema.fields });
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [errors, setErrors] = useState<Errors>({});

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
        [form, submitHandler, setSubmitted, setErrors, schema.validators]
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
                setFormFields({ ...form, [name]: value });
            });
        },
        [form, submitted, errors, schema.validators]
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
            
            startTransition(() => {
                setFormFields({ ...form, [name]: value });
            });
        },
        [form, submitted, errors, schema.validators]
    );

    const getValue = useCallback((name: string) => form[name], [form]);

    const setError = useCallback((name: string, message: string) => setErrors({ ...errors, [name]: message }), [errors]);

    const reset = useCallback(
        (name = null) => {
            if (name) {
                startTransition(() => {
                    setFormFields({ ...form, [name]: schema.fields[name] });
                });
                
            } else {
                startTransition(() => {
                    setFormFields({ ...schema.fields });
                });
               
            }
        },
        [form, schema.fields]
    );

    const register = (name: string) => {
        return {
            name,
            value: getValue(name),
            onChange,
        };
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
};

export default useForm;
