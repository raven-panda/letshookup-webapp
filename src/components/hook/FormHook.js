import { useState } from 'react';

function validateField(value, formData, validations) {
  const fieldErrors = Object.entries(validations)
    .map(([validationKey, validationValue]) => {
      if (validationKey === 'required' && !value) return 'required';

      if (
        validationKey === 'equalsFieldValue' &&
        value !== formData[validationValue]
      )
        return 'equalsFieldValue';

      if (
        validationKey === 'passwordConfirm' &&
        value !== formData[validationValue]
      )
        return 'passwordConfirm';

      return undefined;
    })
    .filter((err) => err);

  return fieldErrors.length > 0 ? fieldErrors[0] : undefined;
}

function validateForm(formData, validations) {
  const errors = {};

  Object.entries(formData)
    .map(([formDataKey, formDataValue]) => ({
      name: formDataKey,
      error: validateField(formDataValue, formData, validations[formDataKey]),
    }))
    .filter((obj) => obj.error)
    .forEach((obj) => (errors[obj.name] = obj.error));

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 *
 * @param defaultValue {object}
 * @param defaultValidations {object}
 * @param submitCallback {(function(): object)}
 * @returns {{formData: object, errors: {}, onChange: (function(e): object), onSubmit: (function(e): object)}}
 */
export function useForm(defaultValue, defaultValidations = {}, submitCallback) {
  if (!defaultValue)
    throw new Error(
      "A 'defaultValue' should be passed into the 'useForm' hook.",
    );

  const [formData, setFormData] = useState(defaultValue);
  const [fieldValidations] = useState(defaultValidations);
  const [errors, setErrors] = useState({});

  const getLabelForError = (error, errorParam) => {
    console.log(error);
    switch (error) {
      case 'required':
        return 'Ce champs est requis.';
      case 'equalsFieldValue':
        return (
          'Ce champs et ' +
          errorParam['equalsFieldValue'] +
          " n'ont pas les mêmes valeurs."
        );
      case 'passwordConfirm':
        return 'Les mots de passes ne correspondent pas.';
      default:
        return error;
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(value, formData, fieldValidations[name]),
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { isValid, errors } = validateForm(formData, fieldValidations);
    if (!isValid) {
      setErrors(errors);
      return;
    }

    return submitCallback();
  };

  return { formData, errors, onChange, onSubmit, getLabelForError };
}
