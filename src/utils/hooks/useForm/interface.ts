export interface UseForm {
  values: Record<string, any>;
  submit: Function;
  getData: Function;
  resetValues: Function;
  getFile: Function;
  check: Function;
  setData: Function;
  setDefault: Function;
  // formData: Function;
  getEditor: Function;
  // filter: Function;
}
