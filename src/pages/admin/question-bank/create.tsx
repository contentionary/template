import CreateQuestionBank from "@src/components/manageDomain/questionBank/create";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";
import Container from "@mui/material/Container";

const CreateQuestionBankPageEntry = () => {
  return (
    <Container maxWidth="md">
      <CreateQuestionBank />
    </Container>
  );
};

export default CreateQuestionBankPageEntry;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context)) as CachedCentreInt;

    return {
      props: {
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
