import { useContext } from "react";

import CourseDetailsPage from "@src/components/CourseDetails";
import AcademyWrapper from "@src/components/Wrapper/AcademyWrapper";
import { CourseDetailsContext } from "@src/pages/courses/[slug]/[courseId]";

const DetailsPage = () => {
  const courseDetails = useContext(CourseDetailsContext);

  return (
    <AcademyWrapper
      title={courseDetails?.name || ""}
      description={courseDetails?.description || "Online course"}
      image="/public/images/logo-icon.png"
      showHeader={true}
      showFooter={true}
    >
      <CourseDetailsPage />
    </AcademyWrapper>
  );
};

export default DetailsPage;
