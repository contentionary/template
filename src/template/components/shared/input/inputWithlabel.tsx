import * as React from "react";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";

interface Props {
  id?: string;
  label?: string;
  sx?: object;
  onChange?: Function;
  name: string;
  type: string;
  dummyText?: string;
  helperTextClass?: string;
  endAdornment?: JSX.Element | string;
  required?: boolean;
  error?: boolean;
}
interface HelperTextProps {
  label?: string;
  helperTextClass?: string;
}
function MyFormHelperText({ label, helperTextClass }: HelperTextProps) {
  const { focused } = useFormControl() || {};

  const helperText = React.useMemo(() => {
    if (focused) {
      return `Enter your ${label}`;
    }

    return label;
  }, [focused, label]);

  return (
    <FormHelperText className={helperTextClass}>{helperText}</FormHelperText>
  );
}
export default function CustomizedInputs({
  id,
  label,
  sx,
  helperTextClass,
  onChange,
  name,
  type,
  dummyText,
  error,
  endAdornment,
}: Props): JSX.Element {
  return (
    <>
      <FormControl sx={sx}>
        <MyFormHelperText label={label} helperTextClass={helperTextClass} />
        <OutlinedInput
          type={type}
          placeholder={dummyText}
          id={id}
          name={name}
          onChange={(e) => onChange && onChange(e)}
          error={error}
          endAdornment={endAdornment}
          required
        />
      </FormControl>
    </>
  );
}
