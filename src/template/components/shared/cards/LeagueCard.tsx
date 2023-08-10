import React from "react";
// next
import NextLink from "next/link";
// mui components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import { Link as MuiLink } from "@mui/material";
// app components
import ImageComponent from "../image";
// icons
import AdjustIcon from "@mui/icons-material/Adjust";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
// styles and interface
import useGlobalStyle from "@src/template/styles";
import useCardStyle from "@src/template/styles/card";
import { LeagueCardFunc } from "./interfaceType";
import {
  kCount,
  dateTimeFormat,
  timeAgo,
  VIDEO_FOLDER_IMAGE_PLACEHOLDER,
  FOLDER_IMAGE_PLACEHOLDER,
} from "@src/utils";

const LeagueCard: LeagueCardFunc = ({ league }) => {
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
    <Card className={cardStyle.leagueCard}>
      <NextLink
        href={type === "FOLDER" ? `/leagues?folderId=${id}` : `/leagues/${id}`}
        passHref
      >
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

export default LeagueCard;
