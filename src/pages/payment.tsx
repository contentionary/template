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
    const { purpose } = context.query;
    const centre = await getCentre(context);
    const { user, token } = getAuthData(context);
    if (!token) return redirect("/login");
    const { data } = await request.get({
      url: "/wallet/supported-currencies",
      token,
    });
    let paymentPlan;
    if (
      centre?.subscriptionModel === "SUBSCRIPTION" &&
      purpose != "FUND_WALLET"
    ) {
      const { data } = await request.get({
        url: `/product/${centre?.id}/pricing`,
        token,
      });
      paymentPlan = data;
    }

    return {
      props: {
        pageData: { currencySupported: data, paymentPlan: paymentPlan || {} },
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
