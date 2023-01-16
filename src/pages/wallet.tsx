import { createContext } from "react";
import { GetServerSideProps } from "next";
import template from "@src/templates";
import { request } from "@src/utils";
import { getCentre, pageErrorHandler } from "@src/utils";
import {
  BasePageProps,
  ExamListInt,
  CachedCentreInt,
} from "@src/utils/interface";
import { getAuthData } from "@src/utils/auth";
import { queryClient } from "@src/utils";

export const CentreExamContext = createContext<ExamListInt | null>(null);

const WalletPage = (pageProps: BasePageProps) => {
  if (pageProps.error) {
    queryClient.setQueryData("pageProps", pageProps);
    const ActiveTemplate =
      template[pageProps.cachedData.centre.template]("ErrorPage");

    return <ActiveTemplate />;
  }
  queryClient.setQueryData("pageProps", pageProps);
  const ActiveTemplate =
    template[pageProps.cachedData.centre.template]("Wallet");
  return <ActiveTemplate />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let centre: any = {};
  const { token, user } = getAuthData(context);
  try {
    const { pageId = 1 } = context.query;
    centre = (await getCentre(context)) as CachedCentreInt;

    const { data } = await request.get({
      url: "/wallet/balance",
      token,
    });
    const { data: transactionHistory } = await request.get({
      url: `/wallet/transaction-history?pageId=${pageId}`,
      token,
    });
    return {
      props: {
        pageData: { walletBalance: data, transactionHistory },
        cachedData: { user, centre, token },
      },
    };
  } catch (err) {
    return pageErrorHandler(err, user, token, centre);
  }
};
export default WalletPage;
