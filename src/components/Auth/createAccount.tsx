import Link from "next/link";
//
import { Grid, Stack, Typography, Hidden } from "@mui/material";
import useForm from "@src/hooks/useForm";
import ButtonComponent from "@src/components/shared/button";
import TextFields from "@src/components/shared/input/inputWithlabel";
import Image from "@src/components/shared/image";
import { Box } from "@mui/system";
import useStyles from "./styles";
import { handleError, request, queryClient } from "@src/utils";
import Loading from "@src/components/shared/loading";
import { useState } from "react";
import { useRouter } from "next/router";
import { BasePageProps } from "@src/utils/interface";
import { useToast } from "@src/utils/hooks";
import dynamic from "next/dynamic";
import { useDialog } from "@src/hooks";
import Dialog from "@src/components/shared/dialog";

const CreateAccount = (): JSX.Element => {
  const Toast = dynamic(() => import("@src/components/shared/toast"));
  const { isOpen, closeDialog, openDialog } = useDialog();
  const { getData, values, resetValues, submit } = useForm(createAccount);
  const [isLoading, setIsLoading] = useState(false);
  const { toastMessage, toggleToast } = useToast();
  const styles = useStyles();
  const router = useRouter();
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;

  async function createAccount() {
    try {
      setIsLoading(true);

      if (values.password !== values.confirmPassword) {
        throw "password mis-matched";
      }
      await request.post({
        url: "/auth/register",
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
    <>
      <Grid container>
        <Hidden smDown={true}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ position: "relative", height: "100vh" }}
          >
            <Link href="/">
              <Image
                src="/images/auth/createAccount.svg"
                alt="contentionary create account"
                width="100%"
                height="100%"
                objectFit="cover"
                layout="fill"
              />
            </Link>
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
            <Box sx={{ marginTop: 2 }}>
              <Image
                src={cachedData.centre.logo || "/images/logo.svg"}
                alt="contentionary create account"
                width={80}
                height={80}
                objectFit="contain"
              />
            </Box>
            <Typography
              variant="h5"
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
                <TextFields
                  type="number"
                  label="Phone Number *"
                  name="phoneNumber"
                  onChange={getData}
                  dummyText="09032415246"
                  helperTextClass={styles.helperTextClass}
                  required={true}
                />
                <Stack direction="row" spacing={1}>
                  <TextFields
                    type="password"
                    label="Password *"
                    name="password"
                    onChange={getData}
                    dummyText="Daniel"
                    helperTextClass={styles.helperTextClass}
                    sx={{ width: "100%" }}
                    required={true}
                  />
                  <TextFields
                    type="password"
                    label="Confirm Password *"
                    name="confirmPassword"
                    onChange={getData}
                    dummyText="Jason"
                    helperTextClass={styles.helperTextClass}
                    sx={{ width: "100%" }}
                    required={true}
                  />
                </Stack>

                <Box>
                  <ButtonComponent
                    type="submit"
                    color="primary"
                    disableElevation
                    variant="contained"
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
                  Already have an account?{" "}
                  <b
                    style={{ color: "#333333", cursor: "pointer" }}
                    onClick={() => router.push("/login")}
                  >
                    Login
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
      <Dialog
        title="Account created!!!"
        isOpen={isOpen}
        closeDialog={closeDialog}
        message="Account created successfully! Don't forget to verify your account via your email to get the best of the system."
        btns={[
          { text: "Procced to login", action: () => router.push("/login") },
          { text: "Cancel", action: closeDialog },
        ]}
      />
    </>
  );
};
export default CreateAccount;
