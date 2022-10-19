import Box from "@mui/material/Box";
import PublicationCard from "./courseCard";
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
  const { exams } = pageData as {
    exams: CourseInt[];
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
          Exams
        </Typography>
        <Menu
          folderId={folderId as string}
          courses={exams}
          centreId={cachedData.centre.id}
        />
      </Box>

      {exams.length ? (
        <Grid
          container
          mb={{ xs: 1, md: 2, xl: 3 }}
          spacing={{ xs: 1, md: 2, xl: 3 }}
          columns={{ xs: 1, sm: 2, md: 3, lg: 5, xl: 6 }}
        >
          {exams?.map((course, index) => (
            <Grid key={`${index}-course-card`} item xs={1}>
              <PublicationCard {...course} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Empty
          href={`/admin/course/create?type=COURSE&folderId=${folderId}`}
          buttonText="Create course"
        />
      )}
    </Box>
  );
};

export default CourseAdmin;
