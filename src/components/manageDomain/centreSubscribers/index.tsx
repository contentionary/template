import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import MuiTable from "@src/components/shared/table";
import AddSubscriber from "./addSubscriber";
import Empty from "@src/components/shared/state/Empty";
import Delete from "../../shared/delete";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useToast } from "@src/utils/hooks";
import CentreUserMenu from "@src/components/shared/export";

interface SubscriberInt {
  surname: string;
  firstname: string;
  username: string;
  email: string;
  phoneNumber: string;
  id: string;
  userId: string;
}
interface SubscriberListInt {
  users: SubscriberInt[];
  pageCount: number;
}
export default function Subscribers({
  subscribers,
  centreId,
}: {
  subscribers: SubscriberListInt;
  centreId: string;
}) {
  const Toast = dynamic(() => import("@src/components/shared/toast"));
  const { toastMessage, toggleToast } = useToast();
  const pageCount = subscribers.pageCount as number;
  const router = useRouter();
  const columns = [
    { minWidth: 50, name: "No", key: "index" },
    { minWidth: 120, name: "Surname", key: "surname" },
    { minWidth: 120, name: "First name", key: "firstname" },
    { minWidth: 150, name: "Email", key: "email" },
    { minWidth: 70, name: "Phone Number", key: "phoneNumber" },
    { minWidth: 50, name: "Status", key: "status" },
    { minWidth: 50, name: "Action", key: "action" },
  ];
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    router.replace({
      query: { ...router.query, pageId: value },
    });
  };
  const refresh = () => {
    router.replace({
      query: { ...router.query },
    });
  };
  const result = subscribers.users.map((user, index: number) => ({
    index: ++index,
    ...user,
    action: (
      <Delete
        url={`/centre/${centreId}/user/${user.userId}/remove`}
        toggleToast={toggleToast}
        updateData={refresh}
      />
    ),
  }));
  if (!subscribers) return <h1>....Loading</h1>;
  return (
    <Box
      component="section"
      sx={{ pt: 4, px: { md: 6 }, pb: 8 }}
      className="hero-section"
    >
      <Stack spacing={4} marginTop={4}>
        <Typography
          variant="h5"
          component="p"
          sx={{ textAlign: "center", fontSize: { xs: 25, md: 32 } }}
        >
          Centre Subscribers
        </Typography>
        <Typography sx={{ display: "flex", justifyContent: "space-between" }}>
          <AddSubscriber
            toggleToast={toggleToast}
            refetch={refresh}
            centreId={centreId as string}
          />
          <CentreUserMenu url={`centre/${centreId}/users`} />
        </Typography>
        {result.length ? (
          <Box>
            <MuiTable data={result} columns={columns} bgColor="#F7F7F7" />
          </Box>
        ) : (
          <Empty />
        )}
      </Stack>
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
      {toastMessage && (
        <Toast
          message={toastMessage}
          status={Boolean(toggleToast)}
          showToast={toggleToast}
        />
      )}
    </Box>
  );
}
