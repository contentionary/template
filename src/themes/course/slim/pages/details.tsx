import CourseDetailsPage from "@src/components/CourseDetails";
import AcademyWrapper from "@src/components/Wrapper/AcademyWrapper";
import { queryClient } from "@src/pages";
import { BasePageProps } from "../../../../utils/interface";

const DetailsPage = () => {
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;

  return (
    <AcademyWrapper
      title={pageData.courseDetails?.name || ""}
      description={pageData.courseDetails?.description || "Online course"}
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <CourseDetailsPage />
    </AcademyWrapper>
  );
};

export default DetailsPage;
