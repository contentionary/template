import { createContext } from "react";
import { GetServerSideProps } from "next";
import themes from "@src/templates";
import { request } from "@src/utils";
import { getCentre, pageErrorHandler } from "@src/utils";
import {
  BasePageProps,
  LeagueListInt,
  CachedCentreInt,
} from "@src/utils/interface";
import { getAuthData } from "@src/utils/auth";
import { queryClient } from "@src/utils";

export const CentreLeaguesContext = createContext<LeagueListInt | null>(null);

const LeaguesPage = (pageProps: BasePageProps) => {
  if (pageProps.error) {
    queryClient.setQueryData("pageProps", pageProps);
    const ActiveTemplate =
      themes[pageProps.cachedData.centre.template]("ErrorPage");

    return <ActiveTemplate />;
  }
  queryClient.setQueryData("pageProps", pageProps);
  const ActiveTemplate =
    themes[pageProps.cachedData.centre.template]("Leagues");

  return <ActiveTemplate />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let centre: any = {};
  const { pageId = 1, folderId = "" } = context.query;
  const { token, user } = getAuthData(context);
  try {
    centre = (await getCentre(context)) as CachedCentreInt;
    const { data: leagueList } = await request.get({
      url: `/centre/${centre.id}/leagues?pageId=${pageId}${
        folderId && `&folderId=${folderId}`
      }`,
      token,
    });
    return {
      props: { pageData: { leagueList }, cachedData: { user, centre, token } },
    };
  } catch (err) {
    return pageErrorHandler(err, user, token, centre);
  }
};
export default LeaguesPage;
