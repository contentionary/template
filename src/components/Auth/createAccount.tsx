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
import NextLink from "@src/components/shared/link/btnLink";
import { handleError, request, queryClient } from "@src/utils";
import Loading from "@src/components/shared/loading";
import { useState } from "react";
import { useRouter } from "next/router";
import { BasePageProps } from "@src/utils/interface";
import { useToast } from "@src/utils/hooks";
import dynamic from "next/dynamic";
import { useDialog } from "@src/hooks";
import Dialog from "@src/components/shared/dialog";
import PhoneInput from "react-phone-input-2";

const CreateAccount = (): JSX.Element => {
  const Toast = dynamic(() => import("@src/components/shared/toast"));
  const { getData, values, resetValues, submit } = useForm(createAccount);
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, closeDialog, openDialog } = useDialog();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toastMessage, toggleToast } = useToast();
  const [value, setValue] = useState("");
  const styles = useStyles();
  const router = useRouter();
  const { redirect } = router.query;
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;

  async function createAccount() {
    try {
      if (values.password !== values.confirmPassword) {
        throw "password mis-matched";
      }
      values.phoneNumber = value;
      await request.post({
        url: `/auth/register?centreId=${cachedData.centre.id}`,
        data: values,
      });
      resetValues();
      setIsLoading(false);
      openDialog();
    } catch (error) {
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Grid container sx={{ height: "100vh" }}>
        <Hidden smDown={true}>
          <Grid item xs={12} md={6} sx={{ position: "relative" }}>
            <Image
              src="/images/auth/createAccount.svg"
              alt="Edtify create account"
              width="100%"
              height="100%"
              objectFit="cover"
              layout="fill"
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
            paddingLeft: { md: 3, xs: 0 },
          }}
        >
          <Stack
            spacing={{ xs: 2 }}
            sx={{
              marginTop: { xs: 7, md: 0 },
            }}
          >
            <Box sx={{ marginY: 3 }}>
              <Link href="/">
                <a>
                  <Image
                    src="/images/logo.png"
                    alt="Edtify create account"
                    width={180}
                    height={55}
                  />
                </a>
              </Link>
            </Box>
            <Typography
              variant="h1"
              component="p"
              className={styles.registerWithUs}
            >
              Register with us
            </Typography>
            <form onSubmit={(e) => submit(e)}>
              <Stack spacing={2}>
                <Stack direction="row" spacing={1}>
                  <TextFields
                    type="text"
                    label="First Name *"
                    name="firstname"
                    onChange={getData}
                    dummyText="Daniel"
                    helperTextClass={styles.helperTextClass}
                    sx={{ width: "100%" }}
                    required={true}
                  />
                  <TextFields
                    type="text"
                    label="Surname *"
                    name="surname"
                    onChange={getData}
                    dummyText="Jason"
                    helperTextClass={styles.helperTextClass}
                    sx={{ width: "100%" }}
                    required={true}
                  />
                </Stack>
                <TextFields
                  type="email"
                  label="Email Address *"
                  name="email"
                  onChange={getData}
                  dummyText="jason@gmail.com"
                  helperTextClass={styles.helperTextClass}
                  required={true}
                />
                <label className={styles.helperTextClass}>Phone number *</label>
                <PhoneInput
                  country="ng"
                  enableSearch={true}
                  value={value}
                  onChange={(e: string) => setValue(e)}
                  inputStyle={{
                    marginLeft: "7%",
                    padding: 28,
                    color: "#888888",
                    width: "93%",
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                  inputProps={{
                    name: "phoneNumber",
                    required: true,
                  }}
                  dropdownStyle={{
                    borderBottomRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    color: "#616161",
                  }}
                  containerStyle={{ marginTop: 0 }}
                  buttonStyle={{
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                />
                <Stack direction="row" spacing={1}>
                  <TextFields
                    type={showPassword ? "text" : "password"}
                    label="Password *"
                    name="password"
                    onChange={getData}
                    dummyText="Daniel"
                    helperTextClass={styles.helperTextClass}
                    sx={{ width: "100%" }}
                    required={true}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <TextFields
                    type={showConfirmPassword ? "text" : "password"}
                    label="Confirm Password*"
                    name="confirmPassword"
                    onChange={getData}
                    dummyText="Jason"
                    helperTextClass={styles.helperTextClass}
                    sx={{ width: "100%" }}
                    required={true}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          edge="end"
                        >
                          {values.showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </Stack>

                <Box>
                  <ButtonComponent
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={styles.btn}
                  >
                    <span>
                      Sign up
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
                  Already have an account?
                  <NextLink
                    href={redirect ? `/login?redirect=${redirect}` : "/login"}
                    sx={{ color: "#333333", fontSize: 18 }}
                  >
                    Login
                  </NextLink>
                </Typography>
              </Stack>
            </form>
          </Stack>
        </Grid>
      </Grid>

      {Boolean(toastMessage) && (
        <Toast
          message={toastMessage}
          showToast={toggleToast}
          status={Boolean(toastMessage)}
        />
      )}
      <Dialog
        title="Account created!!!"
        isOpen={isOpen}
        closeDialog={closeDialog}
        message="Account created successfully! Don't forget to verify your account via your email to get the best of the system."
        btns={[
          {
            text: "Procced to login",
            action: () =>
              router.push(redirect ? `/${redirect}` : "/"),
          },
          { text: "Cancel", action: closeDialog },
        ]}
      />
    </Container>
  );
};
export default CreateAccount;
