import { DEFAULT_LOGO, queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";
import ExamCorrection from "@src/components/ExamCorrections";
import CourseExamLeaguePublicationWrapper from "@src/components/Layout/Wrapper/CourseExamLeaguePublicationWrapper";

const ExamCompletedPage = () => {
  const { cachedData, pageData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { name, logo } = cachedData.centre;

  return (
    <CourseExamLeaguePublicationWrapper
      title={name || ""}
      description="Online Exam"
      image={logo || DEFAULT_LOGO}
      showHeader={false}
      showFooter={false}
    >
      <ExamCorrection pageData={pageData} />
    </CourseExamLeaguePublicationWrapper>
  );
};

export default ExamCompletedPage;
