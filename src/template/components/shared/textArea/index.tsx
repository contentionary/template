import TextareaAutosize from "@mui/material/TextareaAutosize";
interface Props {
  style?: object;
  placeholder?: string;
  maxRows?: number;
  defaultValue?: string;
  onChange: Function;
  required?: boolean;
  name?: string;
  maxLength?: number;
  minLength?: number;
}
const TextArea = ({
  style,
  placeholder,
  maxRows,
  defaultValue,
  onChange,
  required,
  name,
  maxLength,
  minLength,
}: Props): JSX.Element => {
  return (
    <TextareaAutosize
      aria-label="empty textarea"
      maxRows={maxRows}
      placeholder={placeholder}
      style={style}
      defaultValue={defaultValue}
      onChange={(e) => onChange(e)}
      required={required}
      name={name}
      maxLength={maxLength}
      minLength={minLength}
    />
  );
};

export default TextArea;
