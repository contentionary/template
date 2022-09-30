import Publications from "@src/components/Publications";
import PublicationsWrapper from "@src/components/Wrapper/PublicationsWrapper";
import { queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";

const PublicationsPage = () => {
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;

  return (
    <PublicationsWrapper
      title={`${cachedData.centre.name} | Book Store`}
      description={`Welcome to ${cachedData.centre.name} online book store`}
      image="/public/images/logo.png"
      showHeader={true}
      showFooter={true}
    >
      <Publications />
    </PublicationsWrapper>
  );
};

export default PublicationsPage;
