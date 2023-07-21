import Typography from "@mui/material/Typography";
import ButtonComponent from "@src/components/shared/button";
import Toast from "@src/components/shared/toast";
import Loading from "@src/components/shared/loading";
import { getCentre, handleError, isServerSide, request } from "@src/utils";
import { useRouter } from "next/router";
import { useState } from "react";
import TextFields from "@src/components/shared/input/textField";
import useForm from "@src/utils/hooks/useForm";
import { useToast } from "@src/utils/hooks/hooks";
import { GetServerSideProps } from "next";
import { getAuthData } from "@src/utils/auth";
import { CachedCentreInt } from "@src/utils/interface";

const PasswordReset = () => {
  const { toastMessage, toggleToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { getData, values, submit } = useForm(passwordReset);
  const router = useRouter();
  const [tokenExpired, setTokenExpired] = useState(false);

  async function passwordReset() {
    try {
      setIsLoading(true);
      const url = isServerSide ? "" : window.location.href;
      if (!tokenExpired) {
        values.token = router.query.token;
        const { data } = await request.post({
          url: "/auth/security/reset-password",
          data: values,
        });
        toggleToast(data.message);
        setIsLoading(false);
        router.replace(`${url.split("forgotten")[0]}`);
      } else {
        const { message } = await request.post({
          url: "/auth/security/send-reset-password-link",
          data: {
            email: values.email,
            redirectUrl: `${url.split("password")[0]}password`,
          },
        });
        toggleToast(message);
        setIsLoading(false);
      }
    } catch (error) {
      if (handleError(error).message === "jwt expired") setTokenExpired(true);
      toggleToast(handleError(error).message);
      setIsLoading(false);
    }
  }

  return (
    <div
      style={{
        background: "#dbdbdb",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {tokenExpired ? (
        <div style={{ textAlign: "center" }}>
          <Typography sx={{ mb: 2 }} variant="h5">
            Token expired, kindly request for a new token.
          </Typography>
          <form
            onSubmit={(e) => {
              submit(e);
            }}
          >
            <TextFields
              type="email"
              label="Enter your email address"
              name="email"
              onChange={getData}
              sx={{ mb: 2, width: 350 }}
              required={true}
            />
            <br />
            <ButtonComponent variant="contained" size="large" type="submit">
              <>
                Resend password reset token
                {isLoading && (
                  <Loading sx={{ color: "#fff", ml: 1 }} size={15} />
                )}
              </>
            </ButtonComponent>
          </form>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <Typography sx={{ mb: 1 }}>
            Kindly proccess to reset your password
          </Typography>
          <form
            onSubmit={(e) => {
              submit(e);
            }}
          >
            <TextFields
              type="password"
              label="Password"
              name="password"
              onChange={getData}
              sx={{ mb: 2, width: 350 }}
              required={true}
            />
            <br />
            <TextFields
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              onChange={getData}
              sx={{ mb: 2, width: 350 }}
              required={true}
            />
            <br />
            <ButtonComponent variant="contained" size="large" type="submit">
              <>
                Reset password
                {isLoading && (
                  <Loading sx={{ color: "#fff", ml: 1 }} size={15} />
                )}
              </>
            </ButtonComponent>
          </form>
        </div>
      )}

      {Boolean(toastMessage) && (
        <Toast
          message={toastMessage}
          showToast={toggleToast}
          status={Boolean(toastMessage)}
        />
      )}
    </div>
  );
};
export default PasswordReset;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context, true)) as CachedCentreInt;
    return {
      props: {
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
