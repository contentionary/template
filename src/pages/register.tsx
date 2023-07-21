import { GetServerSidePropsContext } from "next";
import { getCentre, handleError, redirect } from "@src/utils";
import { getAuthData } from "../utils/auth";
// app components
import CreateAccount from "@src/template/views/createAccount";

const CreateAccountEntry = () => {
  return <CreateAccount />;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const centre = await getCentre(context);
    const { user, token } = getAuthData(context);
    if (token) return redirect("/", "server");
    return {
      props: {
        pageData: {},
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

export default CreateAccountEntry;
