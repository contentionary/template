import { Grid, Stack, Typography, Hidden } from "@mui/material";
import useForm from "@src/hooks/useForm";
import ButtonComponent from "@src/components/shared/button";
import TextFields from "@src/components/shared/input/inputWithlabel";
import Image from "@src/components/shared/image";
import { Box } from "@mui/system";
import useStyles from "./styles";
import { handleError, request } from "@src/utils";
import Loading from "@src/components/shared/loading";
import { useState } from "react";
import Snackbar from "@src/components/shared/snackerBar";
import { useRouter } from "next/router";
import ForgottenPassword from "./forgottenPassword";
import { setAuth } from "@src/utils/auth";
import { UserInt } from "@src/utils/interface";

const CreateAccount = (): JSX.Element => {
  const loginForm = useForm(submit);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const styles = useStyles();
  const router = useRouter();

  const { getData, values } = loginForm;

  async function submit() {
    try {
      setIsLoading(true);
      const { data } = await request.post({
        url: `/auth/login`,
        data: values,
      });
      setAuth(data as UserInt);
      router.push("/");
      setIsLoading(false);
    } catch (error) {
      setMessage(handleError(error).message);
      setIsLoading(false);
      setTimeout(() => setMessage(""), 3000);
    }
  }

  return (
    <>
      <Grid container>
        <Hidden smDown={true}>
          <Grid
            item
            xs={12}
            md={6}
            style={{
              position: "relative",
              height: "100vh",
            }}
          >
            <Image
              src="/images/auth/createAccount.svg"
              alt="contentionary create account"
              width="100%"
              height="100%"
              layout="fill"
              objectFit="cover"
            />
          </Grid>
        </Hidden>
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            spacing={{ xs: 2 }}
            sx={{
              width: { lg: "70%", xs: "90%" },
              marginTop: { xs: 7, md: 0 },
            }}
          >
            <Box sx={{ marginBottom: 7 }}>
              <Image
                src="/images/logo.svg"
                alt="contentionary create account"
                width={135}
                height={28}
              />
            </Box>
            <Typography
              variant="h5"
              component="p"
              className={styles.registerWithUs}
            >
              Welcome Back
            </Typography>
            <form onSubmit={(e) => loginForm.submit(e)}>
              <Stack spacing={2}>
                <TextFields
                  type="text"
                  label="Email or username"
                  name="username"
                  onChange={getData}
                  dummyText="yesisprosper"
                  helperTextClass={styles.helperTextClass}
                />
                <TextFields
                  type="password"
                  label="Password"
                  name="password"
                  onChange={getData}
                  dummyText="password"
                  helperTextClass={styles.helperTextClass}
                />
                <Box>
                  <ForgottenPassword setMessage={setMessage} />
                  <ButtonComponent
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={styles.btn}
                    disableElevation={true}
                  >
                    <span>
                      Login
                      {isLoading && (
                        <Loading
                          size={12}
                          sx={{ color: "#ffffff", marginLeft: 2 }}
                        />
                      )}
                    </span>
                  </ButtonComponent>
                </Box>
                <Typography
                  variant="body1"
                  component="p"
                  className={styles.loginInstead}
                >
                  {"Don't have an account?"}
                  <b
                    style={{
                      color: "#333333",
                      cursor: "pointer",
                      marginLeft: 2,
                    }}
                    onClick={() => router.push("/register")}
                  >
                    Register
                  </b>
                </Typography>
              </Stack>
            </form>
          </Stack>
        </Grid>
      </Grid>
      <Snackbar message={message} />
    </>
  );
};
export default CreateAccount;
