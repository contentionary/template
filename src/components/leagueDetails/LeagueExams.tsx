import React, { Fragment } from "react";
// mui components
import Grid from "@mui/material/Grid";
// icons
// interface and config
import { useQuery } from "react-query";
import { getAuthData } from "@src/utils/auth";
import { ExamInt } from "@src/utils/interface";
import { handleError, request } from "@src/utils";
import { LeagueDetailsPageFunc } from "./interfaceType";
import ExamCard from "@src/components/shared/cards/ExamCard";

const LeagueExams: LeagueDetailsPageFunc = (props) => {
  const { centreId, id } = props.league;
  const { token } = getAuthData();
  const { isLoading, data, error } = useQuery(
    ["league-exams", centreId, id],
    async () => {
      return await request.get({
        url: `/centre/${centreId}/league/${id}/exams`,
        token,
      });
    }
  );

  if (isLoading) {
    return <div>Loading....</div>;
  } else if (data) {
    return (
      <Fragment>
        <Grid container spacing={3}>
          {data?.data.map((exam: ExamInt, index: number) => (
            <Grid key={`exam-item-${index}`} item xs={12} md={4} xl={4}>
              <ExamCard exam={exam} leagueId={id} />
            </Grid>
          ))}
        </Grid>
      </Fragment>
    );
  } else return <div>{handleError(error).message}</div>;
};

export default LeagueExams;
