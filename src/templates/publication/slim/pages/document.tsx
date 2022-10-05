import Document from "@src/components/Document";
import PublicationsWrapper from "@src/components/Wrapper/PublicationsWrapper";
import { BasePageProps, PublicationInt } from "@src/utils/interface";
import { DEFAULT_LOGO, queryClient } from "@src/utils";

const DocumentPage = () => {
  const { cachedData, pageData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { name, logo } = cachedData.centre;
  const publication = pageData.publication as PublicationInt;

  return <Document publication={publication} />;
};

export default DocumentPage;
