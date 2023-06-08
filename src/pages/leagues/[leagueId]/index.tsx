import React from "react";
import type { GetServerSideProps } from "next";
import themes from "@src/templates";
import { request } from "@src/utils";
import { getCentre, pageErrorHandler } from "@src/utils";
import { BasePageProps, CachedCentreInt } from "@src/utils/interface";
import { getAuthData } from "@src/utils/auth";
import { queryClient } from "@src/utils";

const LeagueDetails = (pageProps: BasePageProps) => {
  if (pageProps.error) {
    queryClient.setQueryData("pageProps", pageProps);
    const ActiveTemplate =
      themes[pageProps.cachedData.centre.template]("ErrorPage");

    return <ActiveTemplate />;
  }
  queryClient.setQueryData("pageProps", pageProps);
  const ActiveTemplate =
    themes[pageProps.cachedData.centre.template]("LeagueDetails");

  return <ActiveTemplate />;
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
