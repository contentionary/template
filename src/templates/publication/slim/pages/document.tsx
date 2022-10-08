import Document from "@src/components/Document";
import { BasePageProps, PublicationInt } from "@src/utils/interface";
import { queryClient } from "@src/utils";

const DocumentPage = () => {
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const publication = pageData.publication as PublicationInt;

  return <Document publication={publication} />;
};

export default DocumentPage;
