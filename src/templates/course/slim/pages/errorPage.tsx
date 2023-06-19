import PageError from "@src/components/shared/state/PageError";
import AcademyWrapper from "@src/components/Layout/Wrapper/AcademyWrapper";

const ErrorPage = () => {
  return (
    <AcademyWrapper
      title="Edtify | Academy"
      description="Welcome to Edtify"
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <PageError />
    </AcademyWrapper>
  );
};

export default ErrorPage;
