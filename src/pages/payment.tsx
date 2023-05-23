import Payment from "@src/components/payment";
import { getCentre, handleError, redirect, request } from "@src/utils";
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
    const { data } = await request.get({
      url: "/wallet/supported-currencies",
      token,
    });
    const { data: paymentPlan } = await request.get({
      url: `/product/${centre?.id}/pricing`,
      token,
    });
    return {
      props: {
        pageData: { currencySupported: data, paymentPlan },
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
