import React, { FormEvent } from "react";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Typography from "@mui/material/Typography";
import TextFields from "@src/components/shared/input/inputWithlabel";
import useForm from "@src/hooks/useForm";
import { useState } from "react";
import useStyles from "./styles";
import { AuthUpdate, handleError, request } from "@src/utils";
import ButtonComponent from "@src/components/shared/button";
import dynamic from "next/dynamic";

const PasswordReset = ({ toggleToast }: { toggleToast: Function }) => {
  const { getData, values, submit, resetValues } = useForm(create);
  const [isLoading, setIsLoading] = useState(false);
  const [formEvent, setFormEvent] = useState<FormEvent<HTMLFormElement>>();
  const [showPassword, setShowPassword] = useState("");
  const Loading = dynamic(() => import("@src/components/shared/loading"));
  const styles = useStyles();

  async function create() {
    try {
      setIsLoading(true);
      await request.patch({
        url: `/auth/update/password`,
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
            Password Settings
          </Typography>

          <TextFields
            type={showPassword === "old" ? "text" : "password"}
            label="Old Password"
            name="oldPassword"
            onChange={getData}
            dummyText="Old password"
            helperTextClass={styles.helperTextClass}
            required
            sx={{ width: "100%" }}
            endAdornment={
              <InputAdornment position="end">
                {showPassword === "old" ? (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword("")}
                    edge="end"
                  >
                    <VisibilityOff />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword("old")}
                    edge="end"
                  >
                    <Visibility />
                  </IconButton>
                )}
              </InputAdornment>
            }
          />
          <TextFields
            type={showPassword === "new" ? "text" : "password"}
            label="New Password"
            name="newPassword"
            onChange={getData}
            dummyText="New password"
            helperTextClass={styles.helperTextClass}
            required
            sx={{ width: "100%" }}
            endAdornment={
              <InputAdornment position="end">
                {showPassword === "new" ? (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword("")}
                    edge="end"
                  >
                    <VisibilityOff />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword("new")}
                    edge="end"
                  >
                    <Visibility />
                  </IconButton>
                )}
              </InputAdornment>
            }
          />
          <TextFields
            type={showPassword === "confirm" ? "text" : "password"}
            label="Confirm Password"
            name="confirmPassword"
            onChange={getData}
            dummyText="Confirm password"
            helperTextClass={styles.helperTextClass}
            required
            sx={{ width: "100%" }}
            endAdornment={
              <InputAdornment position="end">
                {showPassword === "confirm" ? (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword("")}
                    edge="end"
                  >
                    <VisibilityOff />
                  </IconButton>
                ) : (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword("confirm")}
                    edge="end"
                  >
                    <Visibility />
                  </IconButton>
                )}
              </InputAdornment>
            }
          />
        </Stack>
        <Typography sx={{ textAlign: "center", marginTop: 4 }}>
          <ButtonComponent
            variant="contained"
            type="submit"
            sx={{ fontSize: 18 }}
          >
            <>
              Reset Password &nbsp;
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

export default PasswordReset;
