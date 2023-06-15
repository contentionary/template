import React from "react";
// next
import ImageComponent from "@src/components/shared/image";
import { Link as MuiLink } from "@mui/material";
import NextLink from "next/link";
//
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import Button from "@mui/material/Button";
// icons
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import AdjustIcon from "@mui/icons-material/AdjustOutlined";
// styles and interface
import {
  FOLDER_IMAGE_PLACEHOLDER,
  VIDEO_FOLDER_IMAGE_PLACEHOLDER,
  dateTimeFormat,
  kCount,
  timeAgo,
} from "@src/utils";
import useGlobalStyle from "@src/styles";
import useCardStyle from "@src/styles/card";
import { LeagueCardFunc } from "@src/components/shared/cards/interfaceType";

const PublicationCard: LeagueCardFunc = ({ league, folderId }) => {
  const cardStyle = useCardStyle();
  const globalStyle = useGlobalStyle();
  const {
    id,
    name,
    image,
    subscriberCount,
    createdAt,
    type,
    summary,
    folderContentCount,
  } = league;
  return (
    <Card className={cardStyle.publicationCard}>
      <NextLink
        href={
          type === "FOLDER"
            ? `/admin/league?folderId=${id}`
            : folderId
            ? `/admin/league/${id}/exams?folderId=${folderId}`
            : `/admin/league/${id}/exams`
        }
        passHref
      >
        {/* `/admin/league/${id}/update?type=${type}` */}
        <CardActionArea
          LinkComponent={MuiLink}
          className="MuiLeagueCardActionBase-root"
        >
          <Box className="card-img">
            <ImageComponent
              src={
                type === "FOLDER"
                  ? image || FOLDER_IMAGE_PLACEHOLDER
                  : image || VIDEO_FOLDER_IMAGE_PLACEHOLDER
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
              mb={1}
              minHeight={40}
              variant="body2"
              color="text.secondary"
              className={globalStyle.text2LineTruncate}
            >
              {summary}
            </Typography>
            {type === "FOLDER" ? (
              <Typography
                mb={1}
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
                mb={1}
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
                    <AdjustIcon color="primary" fontSize="inherit" />
                    &nbsp;
                    {timeAgo(createdAt)}
                  </>
                </Typography>
                <Typography
                  noWrap
                  mb={0}
                  ml="auto !important"
                  variant="body2"
                  display="flex"
                  alignItems="center"
                  textAlign="right"
                >
                  <AdjustIcon color="primary" fontSize="inherit" />
                  &nbsp;
                  {subscriberCount ? kCount(subscriberCount) : 0} Participants
                </Typography>
              </Stack>
            )}
            <Button fullWidth disableElevation variant="contained">
              Open League
            </Button>
          </CardContent>
        </CardActionArea>
      </NextLink>
    </Card>
  );
};
export default PublicationCard;
