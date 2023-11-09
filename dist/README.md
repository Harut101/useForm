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
  const { errors, register, onSubmit } = useForm(schema, handleSubmit);

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

`getValue`: A function to retrieve the current value of a form field.

`setError`: A function to set an error message for a specific form field.

`reset`: A function to reset form fields to their initial values. You can optionally specify a field name to reset only a specific field.

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

# Happy form handling!
