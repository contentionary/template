import { useState } from "react";
import { ElementProps } from "@src/utils/interface";
import { UseForm } from "./interface";

const useForm = (submitAction: Function): UseForm => {
  const [values, setValue] = useState<any>({});

  const resetValues = () => setValue({});
  const getData = (e: ElementProps) => {
    setValue({ ...values, [e.target.name || e.target.id]: e.target.value });
  };
  const submit = (e: ElementProps): void => {
    if (e) e.preventDefault();
    submitAction();
  };
  const getFile = (e: ElementProps) => {
    setValue({ ...values, [e.target.name || e.target.id]: e.target.files[0] });
  };

  return {
    values,
    getData,
    submit,
    resetValues,
    getFile,
  };
};

export default useForm;
