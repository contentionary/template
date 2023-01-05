import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

interface Props {
  label?: string | JSX.Element;
  onChange: Function;
  name?: string;
  value?: boolean;
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
}
export default function CheckboxLabels({
  label,
  name,
  onChange,
  value,
  className,
  checked,
  defaultChecked,
}: Props): JSX.Element {
  return (
    <FormControlLabel
      onChange={(e) => onChange(e)}
      name={name}
      control={
        <Checkbox
          className={className}
          value={value}
          defaultChecked={defaultChecked}
        />
      }
      label={label}
      checked={checked}
    />
  );
}
