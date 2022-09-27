import PageError from "@src/components/shared/state/PageError";
import AcademyWrapper from "@src/components/Wrapper/AcademyWrapper";
//
import { queryClient } from "@src/pages";
import { BasePageProps } from "@src/utils/interface";

const ErrorPage = () => {
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;

  return (
    <AcademyWrapper
      title={pageData.courseDetails?.name || ""}
      description={pageData.courseDetails?.description || "Online course"}
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <PageError />
    </AcademyWrapper>
  );
};

export default ErrorPage;
