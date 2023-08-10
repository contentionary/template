import React from "react";
// mui
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import MuiTable from "@src/template/components/shared/table";
// styles
import useCardStyle from "@src/template/styles/card";
// interface and config
import { useQuery } from "react-query";
import { getAuthData } from "@src/utils/auth";
import { handleError, request } from "@src/utils";
import { LeagueDetailsPageFunc } from "./interfaceType";

interface ResultInt {
  surname: string;
  firstname: string;
  username: string;
  email: string;
  phoneNumber: string;
  id: string;
}

const LeagueTable: LeagueDetailsPageFunc = (props) => {
  const cardStyle = useCardStyle();
  const { centreId, id } = props.league;
  const { token } = getAuthData();
  const { isLoading, data, error } = useQuery(
    ["league-scoreboard", centreId, id],
    async () => {
      return await request.get({
        url: `/centre/${centreId}/league/${id}/table`,
        token,
      });
    }
  );

  const columns = [
    { minWidth: 50, name: "No", key: "index" },
    { minWidth: 100, name: "Surname", key: "surname" },
    { minWidth: 100, name: "First name", key: "firstname" },
    { minWidth: 70, name: "Exam Taken", key: "examCount" },
    { minWidth: 50, name: "Total Score", key: "totalScore" },
    { minWidth: 50, name: "Duration (In seconds)", key: "duration" },
    { minWidth: 70, name: "Points", key: "points" },
  ];

  const results = data?.data.map((result: ResultInt, index: number) => ({
    index: ++index,
    ...result,
  }));
  if (isLoading) {
    return <div>Loading....</div>;
  } else if (data) {
    return (
      <div>
        {results.length ? (
          <Stack spacing={4} marginTop={3}>
            <Card
              className={cardStyle.defaultCard}
              sx={{ width: { xs: 400, md: "100%" } }}
            >
              <MuiTable data={results} columns={columns} bgColor="#F7F7F7" />
            </Card>
          </Stack>
        ) : (
          <Typography sx={{ textAlign: "center" }}>No Result Found.</Typography>
        )}
      </div>
    );
  } else return <div>{handleError(error).message}</div>;
};

export default LeagueTable;
