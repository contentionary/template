import PageError from "@src/components/shared/state/PageError";
import CourseExamLeaguePublicationWrapper from "@src/components/Wrapper/CourseExamLeaguePublicationWrapper";

const ErrorPage = () => {
  return (
    <CourseExamLeaguePublicationWrapper
      title="Edtify | Academy"
      description="Welcome to Edtify"
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <PageError />
    </CourseExamLeaguePublicationWrapper>
  );
};

export default ErrorPage;
