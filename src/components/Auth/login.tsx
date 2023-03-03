import Link from "next/link";
//
import Hidden from "@mui/material/Hidden";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import useForm from "@src/hooks/useForm";
import ButtonComponent from "@src/components/shared/button";
import TextFields from "@src/components/shared/input/inputWithlabel";
import Image from "@src/components/shared/image";
import useStyles from "./styles";
import { handleError, queryClient, request } from "@src/utils";
import Loading from "@src/components/shared/loading";
import { useState } from "react";
import { useRouter } from "next/router";
import ForgottenPassword from "./forgottenPassword";
import { setAuth } from "@src/utils/auth";
import { BasePageProps, UserInt } from "@src/utils/interface";
import dynamic from "next/dynamic";
import { useToast } from "@src/utils/hooks";

const CreateAccount = (): JSX.Element => {
  const Toast = dynamic(() => import("@src/components/shared/toast"));
  const loginForm = useForm(submit);
  const [isLoading, setIsLoading] = useState(false);
  const { toastMessage, toggleToast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const styles = useStyles();
  const router = useRouter();
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;

  const { getData, values } = loginForm;

  async function submit() {
    try {
      setIsLoading(true);
      const { data } = await request.post({
        url: `/auth/login?centreId=${cachedData.centre.id}`,
        data: values,
      });
      setAuth(data as UserInt, cachedData.centre.id);
      const redirectUrl = pageData?.refererUrl || "/";
      router.push(redirectUrl);
      setIsLoading(false);
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <Container>
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
              width: { lg: "80%", xs: "90%" },
              marginTop: { xs: 7, md: 0 },
            }}
          >
            <Box sx={{ marginBottom: 7 }}>
              <Link href="/" passHref>
                <Image
                  src={cachedData.centre.logo || "/images/logo.svg"}
                  alt="contentionary create account"
                  width={80}
                  height={80}
                  objectFit="contain"
                  style={{ cursor: "pointer" }}
                />
              </Link>
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
                  label="Email or Username"
                  name="username"
                  onChange={getData}
                  dummyText="yesisprosper"
                  helperTextClass={styles.helperTextClass}
                />
                <TextFields
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  name="password"
                  onChange={getData}
                  dummyText="Password"
                  helperTextClass={styles.helperTextClass}
                  endAdornment={
                    <InputAdornment position="end">
                      {!showPassword ? (
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          <VisibilityOff />
                        </IconButton>
                      ) : (
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          <Visibility />
                        </IconButton>
                      )}
                    </InputAdornment>
                  }
                />
                <Box>
                  <ForgottenPassword toggleToast={toggleToast} />
                  <ButtonComponent
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={styles.btn}
                    disableElevation
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
                  {"Don't have an account? "}
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
      {toastMessage && (
        <Toast
          status={Boolean(toastMessage)}
          message={toastMessage}
          showToast={toggleToast}
        />
      )}
    </Container>
  );
};

export default CreateAccount;
