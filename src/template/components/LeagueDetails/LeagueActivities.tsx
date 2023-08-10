import React, { Fragment } from "react";
// mui components
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import useGlobalStyle from "@src/template/styles";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import ListItemAvatar from "@mui/material/ListItemAvatar";
// app components
import UserAvatar from "@src/template/components/shared/avatar/UserAvatar";
// style, util and interface
import {
  request,
  timeAgo,
  handleError,
  formatDuration,
  dateTimeFormat,
} from "@src/utils";
//Date-fn
import { format } from "date-fns";
// interface and config
import { useQuery } from "react-query";
import { queryClient } from "@src/utils";
import { getAuthData } from "@src/utils/auth";
import { LeagueDetailsPageFunc } from "./interfaceType";
import {
  UserInt,
  BasePageProps,
  LeagueActivityInt,
} from "@src/utils/interface";
//
const LeagueActivityItem = ({
  user,
  leagueActivity,
}: {
  user: UserInt;
  leagueActivity: LeagueActivityInt;
}) => {
  const globalStyle = useGlobalStyle();
  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        pr: 0,
        pl: 0,
        gap: 2,
        flexDirection:
          user &&
          user.firstname === leagueActivity.firstname &&
          user.surname === leagueActivity.surname
            ? "row-reverse"
            : "row",
      }}
    >
      <ListItemAvatar
        sx={{
          mr: 2,
          display: {
            xs: "none",
            md: "flex",
          },
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <UserAvatar
          src={leagueActivity.avatar}
          sx={{
            width: 40,
            height: 40,
          }}
          user={{
            firstname: leagueActivity.firstname,
            lastname: leagueActivity.surname,
          }}
        />
        <Typography variant="body2" mb={0} mt="0 !important">
          {timeAgo(leagueActivity.createdAt)}
        </Typography>
      </ListItemAvatar>
      <Box flexGrow={1}>
        <Stack direction="row" spacing={2}>
          <UserAvatar
            src={leagueActivity.avatar}
            sx={{
              mr: 2,
              width: 40,
              height: 40,
              display: { xs: "flex", md: "none" },
            }}
            user={{
              firstname: leagueActivity.firstname,
              lastname: leagueActivity.surname,
            }}
          />
          <Stack direction="row" spacing={1} ml="0 !important" flexGrow={1}>
            <Box flexGrow={1}>
              {/* <Typography variant="h6" mb={0}>
                {leagueActivity.firstname} {leagueActivity.surname}
              </Typography> */}
              <Typography
                variant="body2"
                mb={0}
                mt="0 !important"
                sx={{
                  display: {
                    xs: "block",
                    md: "none",
                  },
                }}
              >
                {timeAgo(leagueActivity.createdAt)}
              </Typography>
            </Box>
          </Stack>
        </Stack>
        <Card className={globalStyle.paperShadowSm} sx={{ mb: 1 }}>
          <Typography paragraph p={1} mb={0}>
            <Typography color="primary" variant="h6" component="span">
              {leagueActivity.firstname} {leagueActivity.surname}
            </Typography>{" "}
            took part in{" "}
            <Typography variant="h6" component="span">
              {leagueActivity.examName}
            </Typography>{" "}
            Examination by{" "}
            <Typography variant="h6" component="span">
              {format(new Date(leagueActivity.createdAt), "h:mm a")}
              {", "}
              {dateTimeFormat(leagueActivity.createdAt)}
            </Typography>{" "}
            and scored{" "}
            <Typography variant="h6" component="span">
              {leagueActivity.score}
            </Typography>{" "}
            within{" "}
            <Typography variant="h6" component="span">
              {formatDuration(leagueActivity.duration)}
            </Typography>
          </Typography>
        </Card>
      </Box>
    </ListItem>
  );
};

const LeagueActivities: LeagueDetailsPageFunc = (props) => {
  const { centreId, id } = props.league;
  const { token } = getAuthData();
  //
  const { cachedData } = queryClient.getQueryData("pageProps") as BasePageProps;
  const { user } = cachedData;
  //
  const { isLoading, data, error } = useQuery(
    ["league-activities", centreId, id],
    async () => {
      return await request.get({
        url: `/centre/${centreId}/league/${id}/activities`,
        token,
      });
    }
  );

  if (isLoading) {
    return <div>Loading....</div>;
  } else if (data) {
    return (
      <Fragment>
        {data?.data.map((leagueActivity: LeagueActivityInt, index: number) => (
          <LeagueActivityItem
            user={user}
            leagueActivity={leagueActivity}
            key={`leagueActivity-item-${index}`}
          />
        ))}
      </Fragment>
    );
  } else return <div>{handleError(error).message}</div>;
};

export default LeagueActivities;
