import PageError from "@src/components/shared/state/PageError";
import AcademyWrapper from "@src/components/Wrapper/AcademyWrapper";

const ErrorPage = () => {
  return (
    <AcademyWrapper
      title="Contentionary | Academy"
      description="Welcome to contentionary"
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <PageError />
    </AcademyWrapper>
  );
};

export default ErrorPage;
