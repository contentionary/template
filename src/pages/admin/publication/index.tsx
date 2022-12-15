import Publications from "@src/components/manageDomain/publication";
import Wrapper from "@src/components/manageDomain";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";

const PublicationPageEntry = () => {
  return (
    <Wrapper>
      <Publications />
    </Wrapper>
  );
};

export default PublicationPageEntry;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context, true)) as CachedCentreInt;
    const { pageId = 1 } = context.query;
    const { data } = await request.get({
      url: context.query.folderId
        ? `/centre/${centre.id}/publications?folderId=${context.query.folderId}&pageId=${pageId}`
        : `/centre/${centre.id}/publications?pageId=${pageId}`,
      token,
    });

    return {
      props: {
        pageData: { centre: centre, publicationLists: data },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
