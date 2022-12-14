import React, { FormEvent } from "react";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/hooks/useForm";
import { useState } from "react";
import { AuthUpdate, handleError, request } from "@src/utils";
import ButtonComponent from "@src/components/shared/button";
import dynamic from "next/dynamic";

const EmailReset = ({ toggleToast }: { toggleToast: Function }) => {
  const { getData, values, submit, resetValues } = useForm(create);
  const [isLoading, setIsLoading] = useState(false);
  const [formEvent, setFormEvent] = useState<FormEvent<HTMLFormElement>>();

  const Loading = dynamic(() => import("@src/components/shared/loading"));

  async function create() {
    try {
      setIsLoading(true);
      await request.patch({
        url: `/auth/update/email`,
        data: values,
      });
      AuthUpdate();
      toggleToast("Update successfull");

      resetValues(formEvent);
      setIsLoading(false);
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <Container maxWidth="xs" sx={{ mb: 10 }}>
      <form
        onSubmit={(e) => {
          submit(e);
          setFormEvent(e);
        }}
        style={{ marginTop: 40 }}
      >
        <Stack spacing={4} mt={3}>
          <Typography
            variant="h5"
            component="div"
            sx={{ textAlign: "center", fontSize: { xs: 25, md: 32 } }}
          >
            Email Settings
          </Typography>
          <TextFields
            type="email"
            label="New Email"
            name="newEmail"
            onChange={getData}
            inputProps={{ maxLength: 60 }}
            sx={{ width: "100%" }}
            required
          />
        </Stack>
        <Typography sx={{ textAlign: "center", marginTop: 4 }}>
          <ButtonComponent
            variant="contained"
            type="submit"
            sx={{ fontSize: 18 }}
          >
            <>
              Change Email{" "}
              {isLoading && (
                <Loading
                  sx={{
                    color: "#fff",
                    zIndex: (theme: any) => theme.zIndex.drawer + 1,
                  }}
                  color="primary"
                  size={15}
                />
              )}
            </>
          </ButtonComponent>
        </Typography>
      </form>
    </Container>
  );
};

export default EmailReset;
