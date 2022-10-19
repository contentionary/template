import Box from "@mui/material/Box";


import PublicationCard from "./card";
import Grid from "@mui/material/Grid";
import dynamic from "next/dynamic";

import { BasePageProps, CourseInt } from "@src/utils/interface";
import { queryClient } from "@src/utils";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";

const CourseAdmin = () => {
  const router = useRouter();
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { questionBanks } = pageData as {
    questionBanks: CourseInt[];
  };
  const { folderId } = router.query;
  const Empty = dynamic(() => import("@src/components/shared/state/Empty"));
  const Menu = dynamic(() => import("./menu"));

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: { xs: 5 },
          mb: 5,
        }}
      >
        <Typography variant="h5" component="div">
          Question Banks
        </Typography>
        <Menu
          folderId={folderId as string}
          courses={questionBanks}
          centreId={cachedData.centre.id}
        />
      </Box>

      {questionBanks.length ? (
        <Grid
          container
          mb={{ xs: 1, md: 2, xl: 3 }}
          spacing={{ xs: 1, md: 2, xl: 3 }}
          columns={{ xs: 1, sm: 2, md: 3, lg: 5, xl: 6 }}
        >
          {questionBanks?.map((course, index) => (
            <Grid key={`${index}-course-card`} item xs={1}>
              <PublicationCard {...course} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Empty
          href={`/admin/question-bank/create?type=COURSE&folderId=${folderId}`}
          buttonText="Add Question bank"
        />
      )}
    </Box>
  );
};

export default CourseAdmin;
