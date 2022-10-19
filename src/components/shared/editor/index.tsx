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
    />
  );
};

export default TextArea;
