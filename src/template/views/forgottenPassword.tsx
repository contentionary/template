import { useState } from "react";
import Typography from "@mui/material/Typography";

import { useDialog } from "@src/utils/hooks";
import useForm from "@src/utils/hooks/useForm";
import { handleError, isServerSide, queryClient, request } from "@src/utils";
import Dialog from "@src/components/shared/dialog";
import TextFields from "@src/components/shared/input/textField";
import useStyles from "@src/styles/auth";
import Loading from "@src/components/shared/loading";
import { BasePageProps } from "@src/utils/interface";

interface Props {
  toggleToast: Function;
}

const ForgottenPassword = ({ toggleToast }: Props): JSX.Element => {
  const styles = useStyles();
  const { isOpen, closeDialog, openDialog } = useDialog();
  const [isLoading, setIsLoading] = useState(false);
  const { getData, values } = useForm(submit);
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;

  async function submit() {
    try {
      setIsLoading(true);
      if (Object.keys(values).length === 0 || values.email === "") {
        throw "kindly enter your email";
      }
      const url = isServerSide ? "" : window.location.href;
      const { message } = await request.post({
        url: `/auth/security/send-reset-password-link?centreId=${cachedData.centre.id}`,
        data: {
          ...values,
          redirectUrl: `${url.split("login")[0]}/forgotten-password`,
        },
      });
      toggleToast(message);
      setIsLoading(false);
      setIsLoading(false);
      closeDialog();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
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
