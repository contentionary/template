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
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
// styles and interface
import useGlobalStyle from "@src/styles";
import useCardStyle from "@src/styles/card";
import { CourseCardFunc } from "./interfaceType";
import {
  kCount,
  dateTimeFormat,
  timeAgo,
  VIDEO_FOLDER_IMAGE_PLACEHOLDER,
} from "@src/utils";

const CourseCard: CourseCardFunc = ({ course }) => {
  const cardStyle = useCardStyle();
  const globalStyle = useGlobalStyle();
  const {
    id,
    name,
    slug,
    imageUrl,
    price,
    subscriberCount,
    createdAt,
    type,
    summary,
    folderContentCount,
  } = course;

  return (
    <Card className={cardStyle.courseCard}>
      <NextLink
        href={
          type === "FOLDER"
            ? `/courses?folderId=${id}`
            : `/courses/${slug}/${id}`
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
                  ? imageUrl || VIDEO_FOLDER_IMAGE_PLACEHOLDER
                  : imageUrl
              }
              width="100%"
              height="60%"
              layout="responsive"
              objectFit="cover"
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
            {type === "FOLDER" ? (
              <Typography
                mb={0}
                noWrap
                display="flex"
                variant="body2"
                alignItems="center"
              >
                <FolderCopyOutlinedIcon color="primary" fontSize="inherit" />
                &nbsp; {folderContentCount || 0}
              </Typography>
            ) : (
              <Stack
                mt="auto"
                spacing={1}
                direction="row"
                alignItems="center"
                justifyContent="between"
              >
                <Typography
                  mb={0}
                  noWrap
                  display="flex"
                  variant="body2"
                  alignItems="center"
                  title={dateTimeFormat(createdAt, true)}
                >
                  <>
                    <AccessTimeOutlinedIcon
                      color="primary"
                      fontSize="inherit"
                    />
                    &nbsp;
                    {timeAgo(createdAt)}
                  </>
                </Typography>
                <Typography
                  noWrap
                  mb={0}
                  variant="body2"
                  display="flex"
                  alignItems="center"
                >
                  <PeopleAltOutlinedIcon color="primary" fontSize="inherit" />
                  &nbsp;
                  {subscriberCount ? kCount(subscriberCount) : 0}
                </Typography>
                <Typography
                  mb={0}
                  ml="auto"
                  flexGrow={1}
                  variant="h5"
                  color="primary"
                  textAlign="right"
                >
                  {price <= 0 ? "Free" : ` ₦${price}`}
                </Typography>
              </Stack>
            )}
          </CardContent>
        </CardActionArea>
      </NextLink>
    </Card>
  );
};

export default CourseCard;
