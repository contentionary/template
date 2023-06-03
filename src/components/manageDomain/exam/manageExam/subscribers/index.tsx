import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { useQuery } from "react-query";

import { handleError, request } from "@src/utils";
import MuiTable from "@src/components/shared/table";
import AddSubscriber from "./addSubscriber";
import Empty from "@src/components/shared/state/Empty";
import Delete from "@src/components/shared/delete";
import TextFields from "@src/components/shared/input/textField";
import ButtonComponent from "@src/components/shared/button";

interface SubscriberInt {
  surname: string;
  firstname: string;
  username: string;
  email: string;
  phoneNumber: string;
  id: string;
  userId: string;
}

const fetchSections = async ({ queryKey }: { queryKey: Array<any> }) => {
  const [, centreId, examId, pageId, limit, setSubscribers] = queryKey;
  const { data } = await request.get({
    url: `/centre/${centreId}/exam/${examId}/subscribers?limit=${limit}&pageId=${pageId}`,
  });
  setSubscribers && setSubscribers(data.subscribers);
  return data;
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
  const [limit, setLimit] = React.useState(50);
  const { isLoading, data, error, refetch } = useQuery(
    ["sections", centreId, examId, 1, limit],
    fetchSections
  );
  const [subscribers, setSubscribers] = React.useState(data?.subscribers);
  const columns = [
    { minWidth: 50, name: "No", key: "index" },
    { minWidth: 100, name: "Surname", key: "surname" },
    { minWidth: 100, name: "First name", key: "firstname" },
    { minWidth: 70, name: "Email", key: "email" },
    { minWidth: 70, name: "Phone Number", key: "phoneNumber" },
    { minWidth: 50, name: "Action", key: "action" },
  ];
  React.useEffect(() => {
    if (data?.subscribers) {
      setSubscribers(data?.subscribers);
    }
  }, [data]);
  const result = subscribers?.map((item: SubscriberInt, index: number) => ({
    index: ++index,
    ...item,
    action: (
      <Delete
        toggleToast={toggleToast}
        url={`/centre/${centreId}/exam/${examId}/user/${item.userId}`}
        updateData={refetch}
      />
    ),
  }));
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (data) {
    const pageCount = data?.pageCount as number;
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      fetchSections({
        queryKey: ["sections", centreId, examId, value, limit, setSubscribers],
      });
    };
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
          <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
            <AddSubscriber toggleToast={toggleToast} refetch={refetch} />
            <Stack direction="row">
              <TextFields
                type="number"
                variant="standard"
                label="Limit"
                onBlur={(e: any) => setLimit(e.target.value)}
                sx={{ maxWidth: 70, padding: 0 }}
              />
              <ButtonComponent
                onClick={() =>
                  fetchSections({
                    queryKey: [
                      "sections",
                      centreId,
                      examId,
                      1,
                      limit,
                      setSubscribers,
                    ],
                  })
                }
              >
                Apply limit
              </ButtonComponent>
            </Stack>
          </Typography>

          {result?.length ? (
            <Box sx={{ width: { xs: 400, md: "100%" } }}>
              <MuiTable data={result} columns={columns} bgColor="#F7F7F7" />
              <Stack py={4} direction="row" justifyContent="center" spacing={2}>
                {pageCount > 1 && (
                  <Pagination
                    count={pageCount}
                    onChange={handleChange}
                    shape="rounded"
                    size="large"
                  />
                )}
              </Stack>
            </Box>
          ) : (
            <Empty />
          )}
        </Stack>
      </div>
    );
  } else return <div>{handleError(error).message}</div>;
}
