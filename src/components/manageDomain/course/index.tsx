import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import EditOutlined from "@mui/icons-material/EditOutlined";
import IconButton from "@mui/material/IconButton";

import useStyles from "./styles";
import NextLink from "@src/components/shared/link/btnLink";
import Link from "@src/components/shared/link";

import PublicationCard from "./courseCard";
import Grid from "@mui/material/Grid";
import dynamic from "next/dynamic";

import { BasePageProps, CourseInt } from "@src/utils/interface";
import { queryClient } from "@src/utils";
import { useRouter } from "next/router";
import Hidden from "@mui/material/Hidden";

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
  const Delete = dynamic(() => import("./delete"));

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          flexDirection: { xs: "column-reverse", md: "row" },
        }}
      >
        <Box sx={{ mt: { xs: 2, md: 5 } }} className={styles.switchContainer}>
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
                ? `/admin/course/create?type=Course&folderId=${folderId}`
                : "/admin/course/create?type=Course"
            }
            disableElevation
            className={styles.createPublication}
          >
            Create course
          </NextLink>
        </Box>
        {folderId && (
          <Box
            sx={{
              display: { xs: "flex", md: "unset" },
              justifyContent: { xs: "center" },
              mt: { xs: 4, md: 0 },
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ textAlign: "center", mr: 2 }}>
                <Link
                  passHref
                  href={`/admin/course/${folderId}/update?type=FOLDER`}
                  className={styles.createFolder}
                >
                  <IconButton>
                    <EditOutlined />
                  </IconButton>
                </Link>
                <Hidden lgDown>
                  <Typography variant="caption" component="div">
                    Want to update Folder?
                  </Typography>
                </Hidden>
              </Box>
              {!courses.length && (
                <Box sx={{ textAlign: "center" }}>
                  <Delete centreId={cachedData.centre.id} id={folderId} />

                  <Hidden lgDown>
                    <Typography variant="caption" component="div">
                      Want to delete Folder?
                    </Typography>
                  </Hidden>
                </Box>
              )}
            </Box>
          </Box>
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
          href={`/admin/course/create?type=Course&folderId=${folderId}`}
          buttonText="Create course"
        />
      )}
    </Box>
  );
};

export default CourseAdmin;
