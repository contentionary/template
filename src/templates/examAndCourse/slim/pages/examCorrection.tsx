import { DEFAULT_LOGO, queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";
import ExamCorrection from "@src/components/ExamCorrections";
import ExamAndCourseWrapper from "@src/components/Wrapper/ExamAndCourseWrapper";

const ExamCompletedPage = () => {
  const { cachedData, pageData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { name, logo } = cachedData.centre;

  return (
    <ExamAndCourseWrapper
      title={name || ""}
      description="Online Exam"
      image={logo || DEFAULT_LOGO}
      showHeader={true}
      showFooter={true}
    >
      <ExamCorrection pageData={pageData} />
    </ExamAndCourseWrapper>
  );
};

export default ExamCompletedPage;
