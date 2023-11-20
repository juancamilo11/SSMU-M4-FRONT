import { useState } from 'react';

interface UseFormProps {
  [key: string]: any;
}

export interface SimpleInputChangeEvent<T> {
  target: {
    name: string;
    value: T;
  };
}

export interface SimpleSelectChangeEvent<T> {
  target: {
    name: string;
    value: T;
  };
}

export interface SimpleCheckboxChangeEvent {
  target: {
    name: string;
    checked: boolean;
  };
}

export interface UserFormValue<T> {
  formValues: T;
  handleInputChange: <T>(event: SimpleInputChangeEvent<T>) => void;
  handleSelectChange: <T>(event: SimpleSelectChangeEvent<T>) => void;
  handleCheckedChange: (event: SimpleCheckboxChangeEvent) => void;
  resetForm: (state: T) => void;
}

const useForm = <T>(initialState: T): UserFormValue<T> => {
  const [formValues, setFormValues] = useState<T>(initialState);

  const handleInputChange = <T>(event: SimpleInputChangeEvent<T>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSelectChange = <T>(event: SimpleSelectChangeEvent<T>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheckedChange = (event: SimpleCheckboxChangeEvent) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.checked,
    });
  };

  const resetForm = (state: T) => {
    setFormValues(state);
  };

  return {
    formValues,
    handleInputChange,
    handleSelectChange,
    handleCheckedChange,
    resetForm,
  };
};

export default useForm;