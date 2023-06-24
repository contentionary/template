import { DEFAULT_LOGO, queryClient } from "@src/utils";
import ExamDetailsPage from "@src/components/ExamDetails";
import { BasePageProps, ExamInt } from "@src/utils/interface";
import ExamAndCourseWrapper from "@src/components/Layout/Wrapper/ExamAndCourseWrapper";

const DetailsPage = () => {
  const { cachedData, pageData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { name, logo } = cachedData.centre;
  const exam = pageData.exam as ExamInt;

  return (
    <ExamAndCourseWrapper
      title={name || ""}
      description={exam?.description || "Online Exam"}
      image={logo || DEFAULT_LOGO}
      showHeader={true}
      showFooter={true}
    >
      <ExamDetailsPage exam={exam} auth={pageData.auth} />
    </ExamAndCourseWrapper>
  );
};

export default DetailsPage;
