import ProctoredLog from "@src/components/manageDomain/exam/manageExam/result/proctoringLog";
import Wrapper from "@src/components/manageDomain";
import { getAuthData } from "@src/utils/auth";
import { getCentre, handleError, request } from "@src/utils";
import { CachedCentreInt } from "@src/utils/interface";
import { GetServerSideProps } from "next";
import Grid from "@mui/material/Grid";
import ImageComponent from "@src/components/shared/image";
import Typography from "@mui/material/Typography";
import { useDialog } from "@src/hooks";
import { useState } from "react";
import { useRouter } from "next/router";

const ProctoredLogs = ({ pageData }: { pageData: any }) => {
  const { query } = useRouter();
  const { isOpen, openDialog, closeDialog } = useDialog();
  const [image, setImage] = useState("");
  function viewImage(image: string) {
    setImage(image);
    openDialog();
  }
  return (
    <Wrapper>
      <div>
        <Typography sx={{ textAlign: "center", mt: 3 }} variant="h4">
          Proctored logs
        </Typography>
        <Typography
          color="primary"
          sx={{ textAlign: "center", mb: 3 }}
          variant="h5"
        >
          {query.surname} {query.firstname}
        </Typography>
        <Grid
          container
          spacing={{ xs: 2, md: 3, lg: 3, xl: 4 }}
          columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }}
        >
          {pageData?.ProctoredLogs?.contents.map(
            (image: string, index: number) => (
              <Grid key={`${index}-exam-card`} item xs={1}>
                <ImageComponent
                  style={{ cursor: "pointer" }}
                  onClick={() => viewImage(image)}
                  src={image}
                  width="100%"
                  height="60%"
                  layout="responsive"
                  //   objectFit={type === "FOLDER" ? "contain" : "cover"}
                  alt="proctoredLog"
                />
              </Grid>
            )
          )}
        </Grid>
        <ProctoredLog isOpen={isOpen} closeDialog={closeDialog} image={image} />
      </div>
    </Wrapper>
  );
};

export default ProctoredLogs;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user, token } = getAuthData(context);
    const centre = (await getCentre(context, true)) as CachedCentreInt;
    const { examAnswerId } = context.query;
    const { data } = await request.get({
      url: `/centre/${centre.id}/protor-content/exam-answer/${examAnswerId}`,
      token,
    });
    return {
      props: {
        pageData: {
          centre: centre,
          ProctoredLogs: data,
        },
        cachedData: { user, centre, token },
      },
    };
  } catch (error) {
    return { props: { error: handleError(error) } };
  }
};
