import Payment from "@src/components/payment";
import { cache, redirect } from "@src/utils";
import type { GetServerSidePropsContext } from "next";

const PaymentEntry = () => {
  return <Payment />;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const token = cache.get("token", context);
  if (token) return redirect("/");

  return {
    props: {},
  };
};

export default PaymentEntry;
