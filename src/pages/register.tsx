import CreateAccount from "@src/components/Auth/createAccount";
import { GetServerSidePropsContext } from "next";
import { getCentre, handleError } from "@src/utils";
import { getAuthData } from "../utils/auth";

const CreateAccountEntry = () => {
  return <CreateAccount />;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const centre = await getCentre(context);
    const { user, token } = getAuthData(context);
    // if (token) return redirect("/");
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
