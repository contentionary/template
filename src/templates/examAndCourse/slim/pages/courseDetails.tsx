import CourseDetailsPage from "@src/components/CourseDetails";
import ExamAndCourseWrapper from "@src/components/Layout/Wrapper/ExamAndCourseWrapper";
import { queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";

const DetailsPage = () => {
  const { pageData } = queryClient.getQueryData("pageProps") as BasePageProps;

  return (
    <ExamAndCourseWrapper
      title={pageData.courseDetails?.name || ""}
      description={pageData.courseDetails?.description || "Online course"}
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <CourseDetailsPage />
    </ExamAndCourseWrapper>
  );
};

export default DetailsPage;
