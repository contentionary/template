import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useQuery } from "react-query";
import { handleError, request } from "@src/utils";
import MuiTable from "@src/components/shared/table";
import TableMenu from "./tableMenu";

interface ResultInt {
  surname: string;
  firstname: string;
  username: string;
  email: string;
  phoneNumber: string;
  id: string;
}

const fetchResult = async ({ queryKey }: { queryKey: Array<any> }) => {
  const [, centreId, examId] = queryKey;
  const { data } = await request.get({
    url: `/centre/${centreId}/exam/${examId}/answers?limit=10000`,
  });
  return data.result;
};

export default function Result({
  centreId,
  examId,
  toggleToast,
}: {
  centreId: string;
  examId: string;
  toggleToast: Function;
}) {
  const { isLoading, data, error } = useQuery(
    ["results", centreId, examId],
    fetchResult
  );
  const columns = [
    { minWidth: 50, name: "No", key: "index" },
    { minWidth: 100, name: "Surname", key: "surname" },
    { minWidth: 100, name: "First name", key: "firstname" },
    { minWidth: 50, name: "Exam Score", key: "score" },
    { minWidth: 50, name: "Duration (In minutes)", key: "duration" },
    { minWidth: 70, name: "Gender", key: "gender" },
    { minWidth: 70, name: "Max Score", key: "maxScore" },
    { minWidth: 250, name: "Action", key: "action" },
  ];
  const results = data?.map((result: ResultInt, index: number) => ({
    index: ++index,
    ...result,
    action: (
      <TableMenu
        result={result}
        centreId={centreId}
        examId={examId}
        toggleToast={toggleToast}
      />
    ),
  }));
  if (isLoading) {
    return <div>Loading....</div>;
  } else if (data) {
    return (
      <div>
        {results.length ? (
          <Stack spacing={4} marginTop={4}>
            <Typography
              variant="h5"
              component="p"
              sx={{ textAlign: "center", fontSize: { xs: 25, md: 32 } }}
            >
              Exam Result
            </Typography>
            <Box sx={{ width: { xs: 400, md: "100%" } }}>
              <MuiTable data={results} columns={columns} bgColor="#F7F7F7" />
            </Box>
          </Stack>
        ) : (
          <Typography sx={{ textAlign: "center" }}>No Result Found.</Typography>
        )}
      </div>
    );
  } else return <div>{handleError(error).message}</div>;
}
