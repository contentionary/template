import Payment from "@src/components/payment";
import { getCentre, handleError, redirect } from "@src/utils";
import type { GetServerSidePropsContext } from "next";
import { getAuthData } from "@src/utils/auth";

const PaymentEntry = () => {
  return <Payment />;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  try {
    const centre = await getCentre(context);
    const { user, token } = getAuthData(context);
    if (!token) return redirect("/login");
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

export default PaymentEntry;
