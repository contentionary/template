import * as React from "react";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import MuiTable from "@src/components/shared/table";
import Empty from "@src/components/shared/state/Empty";

interface SubscriberInt {
  surname: string;
  firstname: string;
  username: string;
  email: string;
  phoneNumber: string;
  id: string;
}

export default function Subscribers({
  pageData,
}: {
  pageData: Record<string, any>;
}) {
  const results = pageData.resultList.result as SubscriberInt[];

  const columns = [
    { minWidth: 50, name: "No", key: "index" },
    { minWidth: 100, name: "Exam Name", key: "name" },
    { minWidth: 100, name: "Score ", key: "score" },
    { minWidth: 70, name: "Max Score", key: "maxScore" },
    { minWidth: 50, name: "Duration (in seconds)", key: "duration" },
  ];
  const result = results?.map((item, index) => ({
    index: ++index,
    ...item,
  }));

  return (
    <Container maxWidth="xl">
      <Box component="section" sx={{ pt: 7, pb: 8, px: { md: 6 } }}>
        <Stack spacing={4} marginTop={4}>
          <Typography
            variant="h5"
            component="p"
            sx={{ fontSize: { xs: 25, md: 32 } }}
          >
            My Results
          </Typography>

          {result.length ? (
            <Box sx={{ width: { xs: 400, md: "100%" } }}>
              <MuiTable data={result} columns={columns} bgColor="#F7F7F7" />
            </Box>
          ) : (
            <Empty />
          )}
        </Stack>
      </Box>
    </Container>
  );
}
