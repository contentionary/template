import { DEFAULT_LOGO, queryClient } from "@src/utils";
import { BasePageProps } from "@src/utils/interface";
import MyResults from "@src/components/MyResult";
import ExamAndCourseWrapper from "@src/components/Wrapper/ExamAndCourseWrapper";

const MyResultsPage = () => {
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
      <MyResults pageData={pageData} />
    </ExamAndCourseWrapper>
  );
};

export default MyResultsPage;
