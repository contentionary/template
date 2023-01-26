import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useQuery } from "react-query";

import { handleError, queryClient, request } from "@src/utils";
import MuiTable from "@src/components/shared/table";
import AddSubscriber from "./addSubscriber";
import Empty from "@src/components/shared/state/Empty";
import Delete from "@src/components/shared/delete";
import { useRouter } from "next/router";
import { useToast } from "@src/utils/hooks";
import dynamic from "next/dynamic";
import { BasePageProps } from "@src/utils/interface";

interface SubscriberInt {
  surname: string;
  firstname: string;
  username: string;
  email: string;
  phoneNumber: string;
  id: string;
}

const fetchSections = async ({ queryKey }: { queryKey: Array<any> }) => {
  const [, centreId, id] = queryKey;
  const { data } = await request.get({
    url: `/centre/${centreId}/publication/${id}/subscribers?limit=100000`,
  });
  return data.subscribers;
};

export default function Subscribers() {
  const Toast = dynamic(() => import("@src/components/shared/toast"));
  const { pageData, cachedData } = queryClient.getQueryData(
    "pageProps"
  ) as BasePageProps;
  const subscribers = pageData.subscribersList.subscribers;
  const router = useRouter();
  const { id } = router.query;
  const centreId = cachedData.centre.id;
  const { toastMessage, toggleToast } = useToast();
  const { isLoading, data, error, refetch } = useQuery(
    ["sections", centreId, id],
    fetchSections,
    { initialData: subscribers }
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
        updateData={refetch}
        toggleToast={toggleToast}
        url={`/centre/${centreId}/publication/${id}/subscriber/${item.id}`}
      />
    ),
  }));
  if (isLoading) {
    return <div>Loading...</div>;
  } else if (data) {
    return (
      <div>
        <Stack spacing={4} marginTop={4}>
          <Typography
            variant="h5"
            component="p"
            sx={{ textAlign: "center", fontSize: { xs: 25, md: 32 } }}
          >
            Publication Subscribers
          </Typography>
          <Typography>
            <AddSubscriber
              toggleToast={toggleToast}
              refetch={refetch}
              centreId={centreId as string}
              id={id as string}
            />
          </Typography>

          {result.length ? (
            <Box sx={{ width: { xs: 400, md: "100%" } }}>
              <MuiTable data={result} columns={columns} bgColor="#F7F7F7" />
            </Box>
          ) : (
            <Empty />
          )}
        </Stack>{" "}
        {toastMessage && (
          <Toast
            message={toastMessage}
            status={Boolean(toggleToast)}
            showToast={toggleToast}
          />
        )}
      </div>
    );
  } else return <div>{handleError(error).message}</div>;
}
