import Box from "@mui/material/Box";

import Stack from "@mui/material/Stack";
import Pagination from "@mui/material/Pagination";

import PublicationCard from "./courseCard";
import Grid from "@mui/material/Grid";
import dynamic from "next/dynamic";

import { BasePageProps, CourseInt } from "@src/utils/interface";
import { queryClient } from "@src/utils";
import { useRouter } from "next/router";

const CourseAdmin = () => {
  const router = useRouter();
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const courses = pageData.courseList.courses as CourseInt[];
  const { folderId } = router.query;
  const Empty = dynamic(() => import("@src/components/shared/state/Empty"));
  const Menu = dynamic(() => import("./folderMenu"));
  const Breadcrumbs = dynamic(
    () => import("@src/components/shared/breadcrumbs")
  );
  const pageCount = pageData.courseList.pageCount as number;
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.replace({
      query: { ...router.query, pageId: value },
    });
  };
  const links = [
    { link: "/admin", name: "Dashboard" },
    { link: "/admin/course", name: "Courses" },
  ];

  return (
    <Box mt={2}>
      <Breadcrumbs
        links={folderId ? links : [{ link: "/admin", name: "Dashboard" }]}
        currentPage={
          folderId
            ? { name: "Folder", link: "/" }
            : { link: "/admin/course", name: "Courses" }
        }
      />
      <Box
        sx={{
          textAlign: "right",
          mt: { xs: 5 },
          mb: 5,
        }}
      >
        <Menu
          folderId={folderId as string}
          coursesLength={courses?.length ? true : false}
          centreId={cachedData.centre.id}
        />
      </Box>

      {courses.length ? (
        <>
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
          </Grid>{" "}
          <Stack py={4} direction="row" justifyContent="center" spacing={2}>
            {pageCount > 1 && (
              <Pagination
                count={pageCount}
                onChange={handleChange}
                shape="rounded"
                size="large"
              />
            )}
          </Stack>
        </>
      ) : (
        <Empty
          href={
            folderId
              ? `/admin/course/create?type=COURSE&folderId=${folderId}`
              : "/admin/course/create?type=COURSE"
          }
          buttonText="Create course"
        />
      )}
    </Box>
  );
};

export default CourseAdmin;
