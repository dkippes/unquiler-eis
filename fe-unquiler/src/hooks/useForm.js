import { useState } from 'react';

const useForm = (initialValues, initialErrors) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);

  const handleChange = (e, hasError) => {
    console.log(e.target.name, hasError);
    setValues({
      ...values,
      [e.target.name]:
        e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    });
    hasError !== undefined &&
      setErrors({ ...errors, [e.target.name]: hasError });
  };

  const handleChangeInCustomInput = (name, value, hasError) => {
    setValues({
      ...values,
      [name]: value,
    });
    hasError !== undefined && setErrors({ ...errors, [name]: hasError });
  };

  const reset = () => {
    setValues(initialValues);
    setErrors(initialErrors);
  };

  return {
    ...values,
    values,
    reset,
    handleChangeInCustomInput,
    handleChange,
    errors,
  };
};

export default useForm;
