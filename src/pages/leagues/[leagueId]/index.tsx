import React from "react";
// next js
import type { GetServerSideProps } from "next";
// utils interface and styles
import { request } from "@src/utils";
import { queryClient } from "@src/utils";
import { getAuthData } from "@src/utils/auth";
import { getCentre, pageErrorHandler } from "@src/utils";
import { BasePageProps, CachedCentreInt } from "@src/utils/interface";
// template components
import ErrorPage from "@src/template/views/errorPage";
import LeagueDetailsPage from "@src/template/views/leagueDetails";

const LeagueDetails = (pageProps: BasePageProps) => {
  if (pageProps.error) {
    queryClient.setQueryData("pageProps", pageProps);

    return <ErrorPage />;
  }
  queryClient.setQueryData("pageProps", pageProps);

  return <LeagueDetailsPage />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let centre: any = {};
  const { user, token } = getAuthData(context);
  try {
    const { leagueId = 1 } = context.query;
    centre = (await getCentre(context)) as CachedCentreInt;
    const { data: leagueDetails, auth = null } = await request.get({
      url: `/centre/${centre.id}/league/${leagueId}`,
      token,
    });

    return {
      props: {
        cachedData: { centre, user, token },
        pageData: { leagueDetails, auth },
      },
    };
  } catch (err) {
    return pageErrorHandler(err, user, token, centre);
  }
};

export default LeagueDetails;
