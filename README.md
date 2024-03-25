# useForm Hook

The useForm hook is a custom React hook designed to simplify form management by handling form field validation, submission and minimizing unnecessary re-renders. This README provides an overview of how to use the useForm hook, its motivation, and usage examples.

# Motivation

Creating and managing forms in React applications can be complex, especially when handling form field validation and submission. The useForm hook was created with the following motivation:

Form Field Validation: It simplifies the process of form field validation by allowing you to define validation rules in a schema.

Form Submission: The hook handles form submission and prevents it from occurring when there are validation errors.

Performance Optimization: The hook is designed to minimize re-renders by updating only when necessary.

# Installation

You can install useForm using npm or yarn:

```sh
  npm install form-manager-hook
```

or

```sh
  yarn add form-manager-hook
```

# Usage

```javascript
import React from "react";
// Import the useForm hook
import useForm, { required, email } from "form-manager-hook";

// Define your form schema
const schema = {
  fields: {
    // Define your form fields here
    email: "",
  },
  validators: {
    // Define your validation rules here
    email: [required(), email("invalid email")],
  },
};

const MyForm = () => {
  // Initialize the useForm hook
  const { errors, register, onSubmit } = useForm(schema, handleSubmit); // useForm(schema, handleSubmit, {mode: "controlled"})

  const handleSubmit = (formData) => {
    // Handle form submission here
    console.log("Form data submitted:", formData);
  };

  return (
    <form onSubmit={onSubmit}>
      {/* Render your form fields and use the register function */}
      <input {...register("email")} />
      {errors.email && <span>{errors.email}</span>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
```

In this example, you define your form schema and validation rules, initialize the useForm hook, and use the provided functions and values to manage your form's state and behavior.

# Functions and Values

`errors`: An object that holds validation errors for form fields.

`submitted`: A boolean value indicating whether the form has been submitted.

`register`: A function to register form fields and their associated events (e.g., onChange).

`onSubmit`: A function to handle form submission, including validation.

`setValue`: A function to set the value of a form field programmatically.
 - Parameters:
   - `name`: The name of the field to update.
   - `value`: The new value to set for the field.
   - `option (optional)`: An object providing additional options for the value assignment, such as controlling the assignment mode (silent or normal). If the mode is set to silent, the draft state is not set to true.

`getValue`: A function to retrieve the current value of a form field.

`setError`: A function to set an error message for a specific form field.

`reset`: A function to reset form fields to their initial values. You can optionally specify a field name to reset only a specific field.

`isDraft`
- **Type:** `boolean`
- **Default:** `false`

  `isDraft` is a boolean state variable provided by the `useForm` hook. Its purpose is to indicate whether the form is in a draft state, meaning that there are unsaved changes. By default, `isDraft` is set to `false`.

  - When a user interacts with the form fields, such as typing in input boxes, `isDraft` automatically switches to `true` to signify that there are pending changes.

  - After submitting the form successfully (assuming there are no validation errors), `isDraft` is set back to `false`. You can use this state to prompt the user to save changes before leaving the page or to provide visual feedback about the form's current state.

# Validator Functions

`number`:

- Parameters: (message: string = "Value is invalid")

`integer`:

- Parameters: (message: string = "Value is invalid")

`required`:

- Parameters: (message: string = "This field is required.")

`min`:

- Parameters: (minValue: string | number, message: string = "Value is invalid")

`max`:

- Parameters: (maxValue: string | number, message: string = "Value is invalid")

`minMax`:

- Parameters: (minValue: string | number, maxValue: string | number, message: string = "Value is invalid")

`test`:

- Parameters: (validator: TestValidatorFuncType, message: string = "Value is invalid")

`email`:

- Parameters: (message: string = "Value is invalid")

# Config Option

`mode`

- **Value:** (`controlled` | `uncontrolled`), default is `uncontrolled`.
  - Choose between making your form fields controlled or uncontrolled. By default, they are uncontrolled.
  - If you set `mode` to `controlled` when using `useForm`, it will return a `form` variable with all fields. You can then use this variable as the value for your form inputs.

`updateBackupForm`

- **Value:** (`true` | `false`), default is `false`.
  - When you set `updateBackupForm` to `true`, after submitting the form, your backup will be updated with the submitted form data. This allows you to reset the form using `reset` from `useForm`, effectively reverting the form to its latest state.

# Happy form handling!
