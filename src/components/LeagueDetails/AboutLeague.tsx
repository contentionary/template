import React, { Fragment } from "react";
// mui components
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
// app components
import { ParticipantCard } from "./LeagueParticipants";
// icons
// interface and config
import { LeagueDetailsPageFunc } from "./interfaceType";
import ImageComponent from "@src/components/shared/image";

const AboutLeague: LeagueDetailsPageFunc = ({ league }) => {
  const { description } = league;

  return (
    <Fragment>
      {/* <Stack>
        <Typography variant="h5" sx={{ mt: 3, mb: 3 }}>
          Top Participants:
        </Typography>
        <Grid mb={4} container spacing={{ xs: 2, xl: 4 }}>
          {Array.from({ length: 3 }).map((index) => (
            <Grid key={`participant-${index}`} item xs={12} sm={6} md={4}>
              <ParticipantCard />
            </Grid>
          ))}
        </Grid>
      </Stack> */}
      <Typography variant="h5" mb={2}>
        ABOUT THIS LEAGUE:
      </Typography>
      <Box dangerouslySetInnerHTML={{ __html: description }} />
    </Fragment>
  );
};

export default AboutLeague;
