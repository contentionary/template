import Box from "@mui/material/Box";

import useStyles from "./styles";
import NextLink from "@src/components/shared/link/btnLink";

import PublicationCard from "./courseCard";
import Grid from "@mui/material/Grid";
import dynamic from "next/dynamic";

import { BasePageProps, CourseInt } from "@src/utils/interface";
import { queryClient } from "@src/utils";
import { useRouter } from "next/router";

const CourseAdmin = () => {
  const styles = useStyles();
  const router = useRouter();
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { courses } = pageData as {
    courses: CourseInt[];
  };
  const { folderId } = router.query;
  const Empty = dynamic(() => import("@src/components/shared/state/Empty"));
  const Menu = dynamic(() => import("./folderMenu"));

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
        <Box className={styles.switchContainer}>
          <NextLink
            href={
              folderId
                ? `/admin/course/create?type=FOLDER&folderId=${folderId}`
                : "/admin/course/create?type=FOLDER"
            }
            disableElevation
            className={styles.createFolder}
          >
            Create Folder
          </NextLink>
          <NextLink
            href={
              folderId
                ? `/admin/course/create?type=COURSE&folderId=${folderId}`
                : "/admin/course/create?type=COURSE"
            }
            disableElevation
            className={styles.createPublication}
          >
            Create course
          </NextLink>
        </Box>
        {folderId && (
          <Menu
            folderId={folderId as string}
            courses={courses}
            centreId={cachedData.centre.id}
          />
        )}
      </Box>

      {courses.length ? (
        <Grid
          container
          mb={{ xs: 1, md: 2, xl: 3 }}
          spacing={{ xs: 1, md: 2, xl: 3 }}
          columns={{ xs: 1, sm: 2, md: 3, lg: 5, xl: 6 }}
        >
          {courses?.map((course, index) => (
            <Grid key={`${index}-course-card`} item xs={1}>
              <PublicationCard {...course} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Empty
          href={folderId ? `/admin/course/create?type=COURSE&folderId=${folderId}` : `/admin/course/create?type=COURSE`}
          buttonText="Create course"
        />
      )}
    </Box>
  );
};

export default CourseAdmin;
