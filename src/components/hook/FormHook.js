import { useState } from 'react';

/**
 *
 * @param value {string}
 * @param formData
 * @param validations
 * @returns {string|undefined}
 */
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

      if (validationKey === 'regexMatch' && !validationValue.test(value))
        return 'regexMatch';

      return undefined;
    })
    .filter((err) => err);

  return fieldErrors.length > 0 ? fieldErrors[0] : undefined;
}

function validateForm(formData, validations = {}) {
  const errors = {};

  const errorArray = Object.entries(formData)
    .map(([formDataKey, formDataValue]) => ({
      name: formDataKey,
      error: validateField(formDataValue, formData, validations[formDataKey]),
    }))
    .filter((obj) => obj.error);

  errorArray.forEach((obj) => (errors[obj.name] = obj.error));

  return {
    isValid: errorArray.length === 0,
    errors,
  };
}

/**
 *
 * @param defaultValue
 * @param defaultValidations
 * @param submitCallback
 * @returns {{formData: object, errors: object, touchedFields: string[], onChange: (function(e): object), onSubmit: (function(): object), getLabelForError: (function(error: string, errorParams?: object): string)}}
 */
export function useForm(defaultValue, defaultValidations = {}) {
  if (!defaultValue)
    throw new Error(
      "A 'defaultValue' should be passed into the 'useForm' hook.",
    );

  const [formData, setFormData] = useState(defaultValue);
  const [touchedFields, setTouchedFields] = useState([]);
  const [fieldValidations] = useState(defaultValidations);
  const [errors, setErrors] = useState({});

  const getLabelForError = (error, errorParam) => {
    switch (error) {
      case 'required':
        return 'Ce champs est requis.';
      case 'equalsFieldValue':
        return (
          'Ce champs et ' +
          errorParam?.['equalsFieldValue'] +
          " n'ont pas les mêmes valeurs."
        );
      case 'passwordConfirm':
        return 'Les mots de passes ne correspondent pas.';
      case 'regexMatch':
        return (
          'La valeur de corresponds pas au format attendu : ' +
          errorParam?.['regexMatch']
        );
      default:
        return error;
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);

    setErrors(validateForm(newFormData, fieldValidations).errors);
    setTouchedFields((prev) => [...prev, name]);
  };

  const onSubmit = () => {
    const { isValid, errors } = validateForm(formData, fieldValidations);
    console.log({ isValid });
    if (!isValid) {
      setErrors(errors);
      return null;
    }

    setTouchedFields([]);
    return formData;
  };

  return {
    formData,
    errors,
    touchedFields,
    onChange,
    onSubmit,
    getLabelForError,
  };
}
