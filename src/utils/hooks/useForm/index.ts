import { ChangeEvent, useState } from "react";
import { UseForm } from "./interface";

const useForm = (submitAction: Function): UseForm => {
  const [values, setValue] = useState<any>({});

  const setDefault = (defaultValues: Record<string, unknown>): void => {
    setValue({ ...values, ...defaultValues });
  };

  const setData = (field: string, data: string): void => {
    values[field] = data;
    setValue({ ...values });
  };

  const resetValues = (e: any) => {
    if (e) e.target.reset();
  };

  const getData = (e: ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...values,
      [e.target.name || e.target.id]: e.target.value,
    });
  };

  const submit = (e: any): void => {
    if (e) e.preventDefault();
    submitAction();
  };

  const getFile = (e: ChangeEvent<any>) => {
    setValue({
      ...values,
      [e.target.name || e.target.id]: e.target.files[0],
    });
  };

  const check = (e: ChangeEvent<any>) => {
    setValue({ ...values, [e.target.name || e.target.id]: e.target.checked });
  };

  const getEditor = (event: any, editor: any, name: string) => {
    values[name] = editor.getData();
    setValue({ ...values });
  };

  return {
    values,
    getData,
    submit,
    resetValues,
    getFile,
    check,
    setData,
    setDefault,
    getEditor,
  };
};

export default useForm;
