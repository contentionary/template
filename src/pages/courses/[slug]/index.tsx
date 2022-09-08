import type { NextPage } from "next";
import CourseDetailsPage from "@src/components/CourseDetails";
import Wrapper from "@src/components/Wrapper";
const CourseDetails: NextPage = () => {
  return (
    <Wrapper
      title="Contentionary"
      description="Seamlessly create your Online Academy in minutes Share, Sell, Engage and Impact your students or subscribers on your terms."
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <CourseDetailsPage />
    </Wrapper>
  );
};

export default CourseDetails;
