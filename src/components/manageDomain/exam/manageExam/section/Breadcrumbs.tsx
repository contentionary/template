import React from "react";
// next
import NextLink from "next/link";
import { useRouter } from "next/router";
// mui components
import { Link as MuiLink } from "@mui/material";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
// interface

const ExamQuestionBreadcrumbs = ({ text }: { text?: boolean }) => {
  const { query } = useRouter();
  return (
    <Stack top={0} position="sticky" spacing={2} mb={2}>
      <Breadcrumbs
        maxItems={4}
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        <NextLink href={`/admin/exam/${query.id}/manage-exam`} passHref>
          <MuiLink underline="hover" color="inherit">
            Manage exam
          </MuiLink>
        </NextLink>
        {query.folderId && (
          <NextLink href={`/admin/exam/${query.id}/question-bank`} passHref>
            <MuiLink underline="hover" color="inherit">
              Question bank
            </MuiLink>
          </NextLink>
        )}
        {text ? (
          <Typography color="text.primary">
            {!query.folderId ? "Question banks" : "Folder"}
          </Typography>
        ) : (
          <NextLink href={`/admin/exam/${query.id}/question-bank`} passHref>
            <MuiLink underline="hover" color="inherit">
              Question bank
            </MuiLink>
          </NextLink>
        )}
        {!text && <Typography color="text.primary">Questions</Typography>}
      </Breadcrumbs>
    </Stack>
  );
};

export default ExamQuestionBreadcrumbs;
