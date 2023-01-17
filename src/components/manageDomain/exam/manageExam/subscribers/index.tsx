import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useQuery } from "react-query";

import { handleError, request } from "@src/utils";
import MuiTable from "@src/components/shared/table";
import AddSubscriber from "./addSubscriber";
import dynamic from "next/dynamic";
import Delete from "@src/components/shared/delete";

interface SubscriberInt {
  surname: string;
  firstname: string;
  username: string;
  email: string;
  phoneNumber: string;
  id: string;
}

const fetchSections = async ({ queryKey }: { queryKey: Array<any> }) => {
  const [, centreId, examId] = queryKey;
  const { data } = await request.get({
    url: `/centre/${centreId}/exam/${examId}/subscribers`,
  });
  return data.subscribers;
};

export default function Subscribers({
  centreId,
  examId,
  toggleToast,
}: {
  centreId: string;
  examId: string;
  toggleToast: Function;
}) {
  const Empty = dynamic(() => import("@src/components/shared/state/Empty"));
  const Loading = dynamic(() => import("@src/components/shared/loading"));
  const { isLoading, data, error, refetch } = useQuery(
    ["sections", centreId, examId],
    fetchSections
  );
  const columns = [
    { minWidth: 50, name: "No", key: "index" },
    { minWidth: 100, name: "Surname", key: "surname" },
    { minWidth: 100, name: "First name", key: "firstname" },
    { minWidth: 50, name: "Username", key: "username" },
    { minWidth: 70, name: "Email", key: "email" },
    { minWidth: 70, name: "Phone Number", key: "phoneNumber" },
    { minWidth: 250, name: "Action", key: "action" },
  ];
  const result = data?.map((item: SubscriberInt, index: number) => ({
    index: ++index,
    ...item,
    action: (
      <Delete
        toggleToast={toggleToast}
        url={`/centre/${centreId}/exam/${examId}/subscriber/${item.id}`}
        updateData={refetch}
      />
    ),
  }));
  if (isLoading) {
    return (
      <Typography
        component="div"
        sx={{
          height: 300,
          display: "flex",
          justifyContent: "center",
          alignItem: "center",
        }}
      >
        <Typography>
          <Loading />
        </Typography>
      </Typography>
    );
  } else if (data) {
    return (
      <div>
        <Stack spacing={4} marginTop={4}>
          <Typography
            variant="h5"
            component="p"
            sx={{ textAlign: "center", fontSize: { xs: 25, md: 32 } }}
          >
            Exam Subscribers
          </Typography>
          <Typography variant="body1" component="p">
            Only subscribed users can take your exam. Click any of the buttons
            to add new subscribers to your exam or assign all the subscribers in
            a Contact group into this exam.
          </Typography>
          <Typography>
            <AddSubscriber toggleToast={toggleToast} refetch={refetch} />
          </Typography>

          {result.length ? (
            <Box sx={{ width: { xs: 400, md: "100%" } }}>
              <MuiTable data={result} columns={columns} bgColor="#F7F7F7" />
            </Box>
          ) : (
            <Empty />
          )}
        </Stack>
      </div>
    );
  } else return <div>{handleError(error).message}</div>;
}
