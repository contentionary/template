import Box from "@mui/material/Box";
import Card from "./card";
import Grid from "@mui/material/Grid";
import dynamic from "next/dynamic";
import { BasePageProps, ExamInt } from "@src/utils/interface";
import { queryClient } from "@src/utils";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import Breadcrumbs from "../breadcrumbs";
import { useEffect, useState } from "react";

const CourseAdmin = () => {
  const router = useRouter();
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const { exams } = pageData as {
    exams: ExamInt[];
  };
  const { folderId, folderName } = router.query;
  const Empty = dynamic(() => import("@src/components/shared/state/Empty"));
  const Menu = dynamic(() => import("./menu"));

  const [links, setLink] = useState([
    { link: "/admin", name: "Dashboard" },
    { link: "/admin/exam", name: "Exams" },
  ]);

  return (
    <Box mt={4}>
      <Breadcrumbs
        links={folderId ? links : [{ link: "/admin", name: "Dashboard" }]}
        currentPage={
          folderId
            ? { name: "Folder", link: "/" }
            : { link: "/admin/exam", name: "Exams" }
        }
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mt: { xs: 5 },
          mb: 5,
        }}
      >
        <Typography variant="h5" component="div" color="primary">
          {folderName ? folderName : "Exams"}
        </Typography>
        <Menu
          folderId={folderId as string}
          exams={exams}
          centreId={cachedData.centre.id}
        />
      </Box>

      {exams.length ? (
        <Grid
          container
          mb={{ xs: 1, md: 2, xl: 3 }}
          spacing={{ xs: 1, md: 2, xl: 3 }}
          columns={{ xs: 1, sm: 2, md: 3, lg: 5 }}
        >
          {exams?.map((exam, index) => (
            <Grid key={`${index}-exam-card`} item xs={1}>
              <Card exam={exam} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Empty
          href={`/admin/exam/create?type=EXAM&folderId=${folderId}`}
          buttonText="Create Exam"
        />
      )}
    </Box>
  );
};

export default CourseAdmin;
