import Login from "@src/components/Auth/login";
import { getCentre, handleError, redirect } from "@src/utils";
import type { GetServerSidePropsContext } from "next";
import { getAuthData } from "../utils/auth";

const LoginEntry = () => {
  return <Login />;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const centre = await getCentre(context);
    const { user, token } = getAuthData(context);
    if (token) return redirect("/");
    return {
      props: {
        pageData: {
          refererUrl: context.req.headers.referer,
        },
        cachedData: {
          centre,
          user,
          token,
        },
      },
    };
  } catch (err) {
    return {
      props: {
        error: handleError(err),
      },
    };
  }
};

export default LoginEntry;
