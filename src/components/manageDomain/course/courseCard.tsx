import React from "react";
// next
import NextLink from "next/link";
//
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Link from "@mui/material/Link";
// icons
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
// styles and interface
import {
  kCount,
  VIDEO_FOLDER_IMAGE_PLACEHOLDER,
  FOLDER_IMAGE_PLACEHOLDER,
  dateTimeFormat,
  timeAgo,
} from "@src/utils";
import useGlobalStyle from "@src/styles";
import useCardStyle from "@src/styles/card";
import { CourseInt } from "@src/utils/interface";
import ImageComponent from "@src/components/shared/image";

const PublicationCard = ({
  name,
  price,
  summary,
  subscriberCount,
  imageUrl,
  type,
  id,
  folderContentCount,
  createdAt,
  slug,
}: CourseInt) => {
  const cardStyle = useCardStyle();
  const globalStyle = useGlobalStyle();

  return (
    <Card className={cardStyle.publicationCard}>
      <NextLink
        href={
          type === "FOLDER"
            ? `/admin/course?folderId=${id}`
            : `/admin/course/${slug}/${id}`
        }
        passHref
      >
        <CardActionArea
          LinkComponent={Link}
          className="MuiCourseCardActionBase-root"
        >
          <Box className="card-img">
            <ImageComponent
              src={
                type === "FOLDER"
                  ? imageUrl || FOLDER_IMAGE_PLACEHOLDER
                  : imageUrl || VIDEO_FOLDER_IMAGE_PLACEHOLDER
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

export default PublicationCard;
