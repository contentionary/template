import React from "react";
// next
import NextLink from "next/link";
// mui components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import { Link as MuiLink } from "@mui/material";
// app components
import ImageComponent from "../image";
// icons
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import QuestionAnswerOutlinedIcon from "@mui/icons-material/QuestionAnswerOutlined";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
// styles and interface
import useGlobalStyle from "@src/styles";
import useCardStyle from "@src/styles/card";
import { ExamCardFunc } from "./interfaceType";
import {
  kCount,
  EXAM_FOLDER_IMAGE_PLACEHOLDER,
  FOLDER_IMAGE_PLACEHOLDER,
} from "@src/utils";

const ExamCard: ExamCardFunc = ({ exam, leagueId }) => {
  const {
    id,
    type,
    slug,
    name,
    image,
    summary,
    questionCount,
    subscriberCount,
    folderContentCount,
  } = exam;
  const cardStyle = useCardStyle();
  const globalStyle = useGlobalStyle();

  return (
    <Card className={cardStyle.examCard}>
      <NextLink
        href={
          type === "FOLDER"
            ? `/exams?folderId=${id}`
            : `/exams/${slug}${
                leagueId ? `/instructions?leagueId=${leagueId}` : ""
              }`
        }
        passHref
      >
        <CardActionArea
          LinkComponent={MuiLink}
          className="MuiCourseCardActionBase-root"
        >
          <Box className="card-img">
            <ImageComponent
              src={
                type === "FOLDER"
                  ? image || FOLDER_IMAGE_PLACEHOLDER
                  : image || EXAM_FOLDER_IMAGE_PLACEHOLDER
              }
              width="100%"
              height="60%"
              layout="responsive"
              objectFit={type === "FOLDER" ? "contain" : "cover"}
              alt={name}
            />
          </Box>
          <CardContent>
            <Stack
              direction="row"
              spacing={1}
              sx={{
                flexWrap: "nowrap",
                alignItems: "start",
                justifyContent: "space-between",
              }}
            >
              <Typography noWrap gutterBottom variant="h6">
                {name}
              </Typography>
            </Stack>
            <Typography
              mb={2}
              minHeight={40}
              variant="body2"
              color="text.secondary"
              className={globalStyle.text2LineTruncate}
            >
              {summary}
            </Typography>
          </CardContent>
          <CardContent className="exam-content">
            {type === "FOLDER" ? (
              <Typography
                mb={0}
                noWrap
                color="white"
                display="flex"
                variant="body2"
                alignItems="center"
              >
                <FolderCopyOutlinedIcon color="inherit" fontSize="inherit" />
                &nbsp; {folderContentCount}
              </Typography>
            ) : (
              <Stack
                mt="auto"
                spacing={1}
                color="white"
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography
                  mb={0}
                  noWrap
                  color="white"
                  display="flex"
                  variant="body2"
                  alignItems="center"
                >
                  <>
                    <QuestionAnswerOutlinedIcon
                      color="inherit"
                      fontSize="inherit"
                    />
                    &nbsp;
                    {questionCount}
                    &nbsp; Questions
                  </>
                </Typography>
                <Typography
                  noWrap
                  mb={0}
                  color="white"
                  display="flex"
                  variant="body2"
                  alignItems="center"
                >
                  {leagueId ? (
                    ""
                  ) : (
                    <React.Fragment>
                      <PeopleAltOutlinedIcon
                        color="inherit"
                        fontSize="inherit"
                      />
                      &nbsp;
                      {subscriberCount ? kCount(subscriberCount) : 0}
                      &nbsp; Subscribers
                    </React.Fragment>
                  )}
                </Typography>
              </Stack>
            )}
          </CardContent>
        </CardActionArea>
      </NextLink>
    </Card>
  );
};

export default ExamCard;
