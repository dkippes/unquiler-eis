import { useState } from 'react';

const useForm = (initialValues, initialErrors) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState(initialErrors);

  const handleChange = (e, hasError) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: hasError });
  };

  const reset = () => {
    setValues(initialValues);
    setErrors(initialErrors);
  };

  return { ...values, values, reset, handleChange, errors };
};

export default useForm;
