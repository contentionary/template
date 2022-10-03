import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface Props {
  label?: string | JSX.Element;
  onChange: Function;
  name?: string;
  value?: boolean;
  className?: string;
}
export default function CheckboxLabels({
  label,
  name,
  onChange,
  value,
  className,
}: Props): JSX.Element {
  return (
    <FormControlLabel
      onChange={(e) => onChange(e)}
      name={name}
      control={<Checkbox className={className} value={value} />}
      label={label}
    />
  );
}
