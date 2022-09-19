import Button, { ButtonProps } from "@mui/material/Button";

interface Props extends ButtonProps {
  children: JSX.Element | string;
}

const ButtonComponent = (props: Props): JSX.Element => {
  const { children, ...otherProps } = props;
  return <Button {...otherProps}>{children}</Button>;
};

export default ButtonComponent;
