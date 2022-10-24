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

//   onChange = (value) => {
//     this.setState({value});
//     if (this.props.onChange) {
//       // Send the changes up to the parent component as an HTML string.
//       // This is here to demonstrate using `.toString()` but in a real app it
//       // would be better to avoid generating a string on each change.
//       this.props.onChange(
//         value.toString('html')
//       );
//     }
//   };



// import RichTextEditor from "react-rte";

// const Editor = () => {
//   const value = RichTextEditor.createEmptyValue();
//   return (
//     <RichTextEditor value={value} onChange={() => console.log("chenged")} />
//   );
// };

// export default Editor;
