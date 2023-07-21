// next js
import { GetServerSideProps } from "next";
// utils interface and styles
import { request } from "@src/utils";
import { queryClient } from "@src/utils";
import { getAuthData } from "@src/utils/auth";
import { getCentre, pageErrorHandler } from "@src/utils";
import { BasePageProps, CachedCentreInt } from "@src/utils/interface";
// template components
import Document from "@src/template/views/document";
import ErrorPage from "@src/template/views/errorPage";

const DocumentPage = (pageProps: BasePageProps) => {
  if (pageProps.error) {
    queryClient.setQueryData("pageProps", pageProps);

    return <ErrorPage />;
  }
  queryClient.setQueryData("pageProps", pageProps);

  return <Document />;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  let centre: any = {};
  const { token, user } = getAuthData(context);
  try {
    centre = (await getCentre(context)) as CachedCentreInt;
    const { data: contentViewToken } = await request.get({
      url: "/content-security/view-access",
      token,
      headers: { contentid: id },
    });
    const { data: publication } = await request.get({
      url: `/centre/${centre.id}/publication/${id}?allowRead=true`,
      token,
      headers: { accesskey: contentViewToken.accessKey },
    });

    return {
      props: {
        pageData: { publication },
        cachedData: { user, centre, token },
      },
    };
  } catch (err) {
    return pageErrorHandler(err, user, token, centre);
  }
};
export default DocumentPage;
