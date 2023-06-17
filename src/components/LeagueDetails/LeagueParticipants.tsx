import React, { Fragment } from "react";
// mui components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import useCardStyle from "@src/styles/card";
import Typography from "@mui/material/Typography";
// icons
// app components
import ImageComponent from "@src/components/shared/image";
// interface and config
import { useQuery } from "react-query";
import { getAuthData } from "@src/utils/auth";
import { handleError, request } from "@src/utils";
import { LeagueDetailsPageFunc } from "./interfaceType";
import { UserInt, ParticipantListInt } from "@src/utils/interface";

export const ParticipantCard = ({
  participant,
  position,
}: {
  participant: UserInt;
  position?: string;
}) => {
  const cardStyle = useCardStyle();
  return (
    <Card
      className={cardStyle.defaultCard}
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {position && (
        <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
          {position}
        </Typography>
      )}
      <Avatar sx={{ width: 52, height: 52 }}>
        <ImageComponent
          layout="fill"
          alt="yes we can"
          objectFit="cover"
          objectPosition="center"
          src={participant.avatar}
        />
      </Avatar>
      <Typography variant="h6" sx={{ mt: 1 }}>
        {participant.firstname} {participant.surname}
      </Typography>
    </Card>
  );
};

const LeagueParticipants: LeagueDetailsPageFunc = ({ league }) => {
  const { id, centreId } = league;
  const { token } = getAuthData();
  const { isLoading, data, error } = useQuery(
    ["league-participants", centreId, id],
    async () => {
      return await request.get({
        url: `/centre/${centreId}/league/${id}/candidates`,
        token,
      });
    }
  );

  const participantList = data?.data as ParticipantListInt;

  if (isLoading) {
    return <div>Loading....</div>;
  } else if (data) {
    return (
      <Fragment>
        <Grid container spacing={3}>
          {participantList.candidates.map((participant, index: number) => (
            <Grid item xl={3} md={4} xs={6} key={`participant-item-${index}`}>
              <ParticipantCard participant={participant} />
            </Grid>
          ))}
        </Grid>
      </Fragment>
    );
  } else return <div>{handleError(error).message}</div>;
};
export default LeagueParticipants;
