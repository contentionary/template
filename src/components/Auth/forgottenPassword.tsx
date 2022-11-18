import Typography from "@mui/material/Typography";
import { useDialog } from "@src/hooks";
import useForm from "@src/hooks/useForm";
import { handleError, request } from "@src/utils";
import Dialog from "@src/components/shared/dialog";
import TextFields from "../shared/input/textField";
import useStyles from "./styles";
import Loading from "../shared/loading";
import { useState } from "react";

interface Props {
  setMessage: Function;
}

const ForgottenPassword = ({ setMessage }: Props): JSX.Element => {
  const styles = useStyles();
  const { isOpen, closeDialog, openDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const { getData, values } = useForm(submit);

  async function submit() {
    try {
      setIsLoading(true);
      if (Object.keys(values).length === 0 || values.email === "") {
        throw "kindly enter your email";
      }
      const { message } = await request.post({
        url: "/auth/security/send-reset-password-link",
        data: { ...values, redirectUrl: "forgotten-password" },
      });
      setMessage(message);
      setTimeout(() => setMessage(""), 3000);
      setIsLoading(false);
      closeDialog();
    } catch (error) {
      setMessage(handleError(error).message);
      setTimeout(() => setMessage(""), 3000);
    }
  }

  const value = (
    <>
      Recover password
      {isLoading && (
        <Loading size={12} color="primary" sx={{ marginLeft: 2 }} />
      )}
    </>
  );

  return (
    <>
      <Typography variant="body1" component="p" className={styles.forgotten}>
        <span style={{ cursor: "pointer" }} onClick={() => openDialog()}>
          Forgot password?
        </span>
      </Typography>

      <Dialog
        title="Recover forgotten password"
        isOpen={isOpen}
        closeDialog={closeDialog}
        message="Forward your email address and a link will be sent to you to recover your password."
        content={
          <TextFields
            type="email"
            label="Email Address *"
            name="email"
            onChange={getData}
            sx={{ width: "100%", marginTop: 3 }}
          />
        }
        btns={[
          { text: value, action: submit },
          { text: "Cancel", action: closeDialog },
        ]}
      />
    </>
  );
};
export default ForgottenPassword;
