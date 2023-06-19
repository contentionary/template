import PageError from "@src/components/shared/state/PageError";
import ExamAndLeagueWrapper from "@src/components/Layout/Wrapper/ExamAndLeagueWrapper";

const ErrorPage = () => {
  return (
    <ExamAndLeagueWrapper
      title="Edtify | Academy"
      description="Welcome to Edtify"
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <PageError />
    </ExamAndLeagueWrapper>
  );
};

export default ErrorPage;
